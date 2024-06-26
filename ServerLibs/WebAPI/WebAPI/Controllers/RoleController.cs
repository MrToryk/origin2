﻿using AutoMapper;
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

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateRole([FromBody] RoleDto roleCreate)
        {
            if (roleCreate == null)
                return BadRequest(ModelState);

            var role = _roleRepository.GetRoles()
                .Where(r => r.Name.Trim().ToUpper() == roleCreate.Name.Trim().ToUpper())
                .FirstOrDefault();

            if (role != null)
            {
                ModelState.AddModelError("", "Role already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var roleMap = _mapper.Map<Role>(roleCreate);

            if (!_roleRepository.CreateRole(roleMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving new role");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully");
        }

        [HttpPut("{roleId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateRole(int roleId, [FromBody] RoleDto updatedRole)
        {
            if (updatedRole == null)
                return BadRequest(ModelState);

            if (roleId != updatedRole.Id)
                return BadRequest(ModelState);

            if (!_roleRepository.RoleExists(roleId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var roleMap = _mapper.Map<Role>(updatedRole);

            if (!_roleRepository.UpdateRole(roleMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating role");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{roleId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteRole(int roleId)
        {
            if (!_roleRepository.RoleExists(roleId))
                return NotFound();

            var roleToDelete = _roleRepository.GetRole(roleId);

            if (_roleRepository.GetUsersByRole(roleId).Any())
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_roleRepository.DeleteRole(roleToDelete))
            {
                ModelState.AddModelError("", "Something went wrong while deleting role");
            }

            return NoContent();
        }
    }
}
