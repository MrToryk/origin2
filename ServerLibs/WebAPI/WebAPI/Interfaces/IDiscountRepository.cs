using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDiscountRepository
    {
        ICollection<Discount> GetDiscounts();
        Discount GetDiscount(int id);
        ICollection<Product> GetProductsByDiscount(int discId);
        bool DiscountExists(int id);
        bool CreateDiscount(Discount discount);
        bool Save();
    }
}
