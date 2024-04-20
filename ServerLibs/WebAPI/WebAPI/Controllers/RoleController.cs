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
    public class RoleController : Controller
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RoleController(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Role>))]
        public IActionResult GetCategories()
        {
            var roles = _mapper.Map<List<RoleDto>>(_roleRepository.GetRoles());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(roles);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Role))]
        public IActionResult GetRole(int id)
        {
            if (!_roleRepository.RoleExists(id))
                return NotFound();

            var role = _mapper.Map<RoleDto>(_roleRepository.GetRole(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(role);
        }

        [HttpGet("users/{roleId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        [ProducesResponseType(400)]
        public IActionResult GetUsersByRole(int roleId)
        {
            if (!_roleRepository.RoleExists(roleId))
                return NotFound();

            var users = _mapper.Map<List<User>>(_roleRepository.GetUsersByRole(roleId));
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }
    }
}
