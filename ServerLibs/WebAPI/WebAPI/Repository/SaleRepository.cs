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

        public bool CreateSale(Sale sale, int productId, int userId)
        {
            var productEntity = _context.Products.Where(s => s.Id == productId).FirstOrDefault();
            var userEntity = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            // Entity null check
            if (productEntity == null || userEntity == null)
                return false;

            sale.Product = productEntity;
            sale.User = userEntity;

            // Sale input check
            if (sale.SoldAmount > productEntity.StoredAmount || sale.SoldAmount < 1)
                return false;

            productEntity.StoredAmount -= sale.SoldAmount;

            // Product expiration check
            if (productEntity.ExpireDate != null)
            if (DateOnly.FromDateTime(sale.SaleDate) > productEntity.ExpireDate)
                return false;

            // Dsicount evaluation
            var discountEntity = _context.Discounts.Where(d => d.DiscountProducts.Contains(productEntity)).FirstOrDefault();

            double pricePerUnit = productEntity.SellingPrice;

            if (discountEntity != null)
            {
                if (sale.SaleDate > discountEntity.StartingDate
                    && sale.SaleDate < discountEntity.EndingDate)
                    pricePerUnit = pricePerUnit * (100 - discountEntity.DiscountValue) / 100;
            }

            pricePerUnit = pricePerUnit < productEntity.MinimalPrice ? productEntity.MinimalPrice : pricePerUnit;

            sale.PricePerUnit = pricePerUnit;

            // Add
            _context.Add(sale);

            return Save();
        }

        public bool DeleteSale(Sale sale)
        {
            _context.Remove(sale);

            return Save();
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

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateSale(Sale sale, int productId, int userId)
        {
            var productEntity = _context.Products.Where(p => p.Id == productId).FirstOrDefault();
            var userEntity = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            if (productEntity != null) sale.Product = productEntity;
            if (userEntity != null) sale.User = userEntity;

            _context.Update(sale);

            return Save();
        }
    }
}
