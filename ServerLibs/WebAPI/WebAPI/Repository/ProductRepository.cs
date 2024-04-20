using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public Product GetProduct(int id)
        {
            return _context.Products.Where(p => p.Id == id).FirstOrDefault();
        }

        public Product GetProduct(string name)
        {
            return _context.Products.Where(p => p.Name == name).FirstOrDefault();
        }

        public int GetProductSaleNumber(int prodId)
        {
            var sales = _context.Sales.Where(p => p.Product.Id == prodId);

            if (sales.Count() <= 0)
                return 0;

            return sales.Sum(a => a.SoldAmount);
        }

        public ICollection<Product> GetProducts()
        {
            return _context.Products.OrderBy(p => p.Id).ToList();
        }

        public bool ProductExists(int id)
        {
            return _context.Products.Any(p => p.Id == id);
        }
    }
}
