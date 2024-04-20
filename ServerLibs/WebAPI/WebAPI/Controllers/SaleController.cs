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
    }
}
