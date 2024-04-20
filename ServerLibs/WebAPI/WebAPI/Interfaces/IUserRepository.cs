using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        public ICollection<User> GetUsers();
        public User GetUser(int id);
        public User GetUser(string username);
        public ICollection<Product> GetProductsByUser(int userId);
        public ICollection<Sale> GetSalesByUser(int userId);
        public bool UserExists(int id);
    }
}
