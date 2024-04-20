using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public class DiscountRepository : IDiscountRepository
    {
        private DataContext _context;

        public DiscountRepository(DataContext context)
        {
            _context = context;
        }
        public bool DiscountExists(int id)
        {
            return _context.Discounts.Any(d => d.Id == id);
        }

        public Discount GetDiscount(int id)
        {
            return _context.Discounts.Where(d => d.Id == id).FirstOrDefault();
        }

        public ICollection<Discount> GetDiscounts()
        {
            return _context.Discounts.ToList();
        }

        public ICollection<Product> GetProductsByDiscount(int discId)
        {
            return _context.Products.Where(p => p.Discount.Id == discId).ToList();
        }
    }
}
