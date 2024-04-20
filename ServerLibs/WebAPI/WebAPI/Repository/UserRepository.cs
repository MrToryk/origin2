using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Product> GetProductsByUser(int userId)
        {
            return _context.Products.Where(p => p.Owner.Id == userId).ToList();
        }

        public ICollection<Sale> GetSalesByUser(int userId)
        {
            return _context.Sales.Where(s => s.User.Id == userId).ToList();
        }

        public User GetUser(int id)
        {
            return _context.Users.Where(u => u.Id == id).FirstOrDefault();
        }

        public User GetUser(string username)
        {
            return _context.Users.Where(u => u.Username == username).Include(e => e.Role).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.Include(e => e.Role).ToList();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
    }
}
