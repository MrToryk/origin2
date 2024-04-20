using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public class RoleRepository : IRoleRepository
    {
        private DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public Role GetRole(int id)
        {
            return _context.Roles.Where(r => r.Id == id).FirstOrDefault();
        }

        public ICollection<Role> GetRoles()
        {
            return _context.Roles.ToList();
        }

        public ICollection<User> GetUsersByRole(int roleId)
        {
            return _context.Users.Where(p => p.Role.Id == roleId).ToList();
        }

        public bool RoleExists(int id)
        {
            return _context.Roles.Any(r => r.Id == id);
        }
    }
}
