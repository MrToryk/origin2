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
    public class DiscountController : Controller
    {
        private readonly IDiscountRepository _discountRepository;
        private readonly IMapper _mapper;

        public DiscountController(IDiscountRepository discountRepository, IMapper mapper)
        {
            _discountRepository = discountRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Discount>))]
        public IActionResult GetDiscounts()
        {
            var discounts = _mapper.Map<List<DiscountDto>>(_discountRepository.GetDiscounts());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(discounts);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Discount))]
        [ProducesResponseType(400)]
        public IActionResult GetDiscount(int id)
        {
            if (!_discountRepository.DiscountExists(id))
                return NotFound();

            var discount = _mapper.Map<DiscountDto>(_discountRepository.GetDiscount(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(discount);
        }

        [HttpGet("products/{discId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Discount>))]
        [ProducesResponseType(400)]
        public IActionResult GetProductsByDiscount(int discId)
        {
            if (!_discountRepository.DiscountExists(discId))
                return NotFound();

            var products = _mapper.Map<List<ProductDto>>(_discountRepository.GetProductsByDiscount(discId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(products);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateDiscount([FromBody] DiscountDto discountCreate)
        {
            if (discountCreate == null)
                return BadRequest(ModelState);

            var discount = _discountRepository.GetDiscounts()
                .Where(r => r.Title.Trim().ToUpper() == discountCreate.Title.Trim().ToUpper())
                .FirstOrDefault();

            if (discount != null)
            {
                ModelState.AddModelError("", "Discount already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var discountMap = _mapper.Map<Discount>(discountCreate);

            if (!_discountRepository.CreateDiscount(discountMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving new discount");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }
        [HttpPut("{discountId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateDiscount(int discountId, [FromBody] DiscountDto updatedDiscount)
        {
            if (updatedDiscount == null)
                return BadRequest(ModelState);

            if (discountId != updatedDiscount.Id)
                return BadRequest(ModelState);

            if (!_discountRepository.DiscountExists(discountId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var discountMap = _mapper.Map<Discount>(updatedDiscount);

            if (!_discountRepository.UpdateDiscount(discountMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating discount");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
