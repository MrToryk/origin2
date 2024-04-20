using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Dto;

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
    }
}
