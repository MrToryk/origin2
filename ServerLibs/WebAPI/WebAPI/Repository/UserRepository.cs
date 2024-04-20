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

        public bool CreateUser(User user, int roleId)
        {
            var roleEntity = _context.Roles.Where(r => r.Id == roleId).FirstOrDefault();

            user.Role = roleEntity;

            _context.Add(user);

            return Save();
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

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
    }
}
