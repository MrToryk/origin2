using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IRoleRepository
    {
        ICollection<Role> GetRoles();
        Role GetRole(int id);   
        ICollection<User> GetUsersByRole(int roleId);
        bool RoleExists(int id);
        bool CreateRole(Role role);
        bool Save();
    }
}
