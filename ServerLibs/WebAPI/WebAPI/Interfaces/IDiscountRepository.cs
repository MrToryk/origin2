using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDiscountRepository
    {
        public ICollection<Discount> GetDiscounts();
        public Discount GetDiscount(int id);
        public ICollection<Product> GetProductsByDiscount(int discId);
        public bool DiscountExists(int id);
    }
}
