using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Dto;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Product>))]
        public IActionResult GetProducts()
        {
            var products = _mapper.Map<List<ProductDto>>(_productRepository.GetProducts());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(products);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Product))]
        [ProducesResponseType(400)]
        public IActionResult GetProduct(int id) 
        {
            if (!_productRepository.ProductExists(id))
                return NotFound();

            var product = _mapper.Map<ProductDto>(_productRepository.GetProduct(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(product);
        }

        [HttpGet("sales/{prodId}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(400)]
        public IActionResult GetProductSaleNumber(int prodId)
        {
            if (!_productRepository.ProductExists(prodId))
                return NotFound();

            var sales = _productRepository.GetProductSaleNumber(prodId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sales);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateProduct([FromQuery] int ownerId, [FromQuery] int discountId, [FromQuery] int categoryId, [FromBody] ProductDto productCreate)
        {
            if (productCreate == null)
                return BadRequest(ModelState);

            var product = _productRepository.GetProducts()
                .Where(r => r.Name.Trim().ToUpper() == productCreate.Name.Trim().ToUpper())
                .FirstOrDefault();

            if (product != null)
            {
                ModelState.AddModelError("", "Product already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var productMap = _mapper.Map<Product>(productCreate);

            if (!_productRepository.CreateProduct(productMap, ownerId, discountId, categoryId))
            {
                ModelState.AddModelError("", "Something went wrong while saving new product");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }
        [HttpPut("{productId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateProduct(int productId, [FromQuery] int ownerId, [FromQuery] int discountId, [FromQuery] int categoryId, [FromBody] ProductDto updatedProduct)
        {
            if (updatedProduct == null)
                return BadRequest(ModelState);

            if (productId != updatedProduct.Id)
                return BadRequest(ModelState);

            if (!_productRepository.ProductExists(productId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var productMap = _mapper.Map<Product>(updatedProduct);

            if (!_productRepository.UpdateProduct(productMap, ownerId, discountId, categoryId))
            {
                ModelState.AddModelError("", "Something went wrong while updating product");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{productId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteProduct(int productId)
        {
            if (!_productRepository.ProductExists(productId))
                return NotFound();

            var productToDelete = _productRepository.GetProduct(productId);

            if (_productRepository.GetSalesByProduct(productId).Any())
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_productRepository.DeleteProduct(productToDelete))
            {
                ModelState.AddModelError("", "Something went wrong while deleting product");
            }

            return NoContent();
        }
    }
}
