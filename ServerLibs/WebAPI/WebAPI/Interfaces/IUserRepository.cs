using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        User GetUser(int id);
        User GetUser(string username);
        ICollection<Product> GetProductsByUser(int userId);
        ICollection<Sale> GetSalesByUser(int userId);
        bool UserExists(int id);
        bool CreateUser(User user, int roleId);
        bool UpdateUser(User user, int roleId);
        bool DeleteUser(User user);
        bool Save();
    }
}
