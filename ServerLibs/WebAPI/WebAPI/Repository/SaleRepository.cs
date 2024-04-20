using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public class SaleRepository : ISaleRepository
    {
        private DataContext _context;

        public SaleRepository(DataContext context)
        {
            _context = context;
        }

        public Sale GetSale(int id)
        {
            return _context.Sales.Where(s => s.Id == id).FirstOrDefault();
        }

        public ICollection<Sale> GetSales()
        {
            return _context.Sales.ToList();
        }

        public bool SaleExists(int id)
        {
            return _context.Sales.Any(s => s.Id == id);
        }
    }
}
