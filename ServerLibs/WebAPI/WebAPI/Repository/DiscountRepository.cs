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

        public bool CreateDiscount(Discount discount)
        {
            _context.Add(discount);

            return Save();
        }

        public bool DeleteDiscount(Discount discount)
        {
            _context.Remove(discount);

            return Save();
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

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateDiscount(Discount discount)
        {
            _context.Update(discount);
            return Save();
        }
    }
}
