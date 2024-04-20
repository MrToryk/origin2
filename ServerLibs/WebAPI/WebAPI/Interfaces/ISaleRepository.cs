using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ISaleRepository
    {
        public ICollection<Sale> GetSales();
        public Sale GetSale(int id);
        public bool SaleExists(int id);
    }
}
