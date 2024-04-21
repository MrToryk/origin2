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

        public bool CreateRole(Role role)
        {
            _context.Add(role);

            return Save();
        }

        public bool DeleteRole(Role role)
        {
            _context.Remove(role);

            return Save();
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

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateRole(Role role)
        {
            _context.Update(role);

            return Save();
        }
    }
}
