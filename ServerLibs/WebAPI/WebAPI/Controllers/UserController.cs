using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Dto;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<User>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(int id)
        {
            if (!_userRepository.UserExists(id))
                return NotFound();

            var user = _mapper.Map<UserDto>(_userRepository.GetUser(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet("products/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
        [ProducesResponseType(400)]
        public IActionResult GetProductsByUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound();

            var products = _mapper.Map<List<ProductDto>>(_userRepository.GetProductsByUser(userId));

            if (!ModelState.IsValid)
                BadRequest(ModelState);

            return Ok(products);
        }

        [HttpGet("sales/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
        [ProducesResponseType(400)]
        public IActionResult GetSalesByUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
                return NotFound();

            var sales = _mapper.Map<List<SaleDto>>(_userRepository.GetSalesByUser(userId));

            if (!ModelState.IsValid)
                BadRequest(ModelState);

            return Ok(sales);
        }
    }
}
