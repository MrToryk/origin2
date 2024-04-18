using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Product>))]
        public IActionResult GetProduct()
        {
            var products = _productRepository.GetProducts();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(products);
        }
    }
}
