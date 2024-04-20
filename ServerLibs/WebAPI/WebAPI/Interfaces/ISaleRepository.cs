using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ISaleRepository
    {
        ICollection<Sale> GetSales();
        Sale GetSale(int id);
        bool SaleExists(int id);
        bool CreateSale(Sale sale, int productId, int userId);
        bool UpdateSale(Sale sale, int productId, int userId);
        bool Save();
    }
}
