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
    public class SaleController : Controller
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IMapper _mapper;

        public SaleController(ISaleRepository saleRepository, IMapper mapper)
        {
            _saleRepository = saleRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Sale>))]
        public IActionResult GetSales() 
        {
            var sales = _mapper.Map<List<SaleDto>>(_saleRepository.GetSales());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sales);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Sale))]
        [ProducesResponseType(400)]
        public IActionResult GetSale(int id)
        {
            if (!_saleRepository.SaleExists(id))
                return NotFound();

            var sale = _mapper.Map<SaleDto>(_saleRepository.GetSale(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(sale);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateSale([FromQuery] int productId, [FromQuery] int userId, [FromBody] SaleDto saleCreate)
        {
            if (saleCreate == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var saleMap = _mapper.Map<Sale>(saleCreate);

            if (!_saleRepository.CreateSale(saleMap, productId, userId))
            {
                ModelState.AddModelError("", "Something went wrong while saving new sale");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }

        [HttpPut("{saleId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateSale(int saleId, [FromQuery] int productId, [FromQuery] int userId, [FromBody] SaleDto updatedSale)
        {
            if (updatedSale == null)
                return BadRequest(ModelState);

            if (saleId != updatedSale.Id)
                return BadRequest(ModelState);

            if (!_saleRepository.SaleExists(saleId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var saleMap = _mapper.Map<Sale>(updatedSale);

            if (!_saleRepository.UpdateSale(saleMap, productId, userId))
            {
                ModelState.AddModelError("", "Something went wrong while updating sale");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
