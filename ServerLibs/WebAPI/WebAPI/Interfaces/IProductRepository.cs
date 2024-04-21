using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IProductRepository
    {
        ICollection<Product> GetProducts();
        Product GetProduct(int id);
        Product GetProduct(string name);
        ICollection<Sale> GetSalesByProduct(int prodId);
        int GetProductSaleNumber(int prodId);
        bool ProductExists(int id);
        bool CreateProduct(Product product, int ownerId, int discountId, int categoryId);
        bool UpdateProduct(Product product, int ownerId, int discountId, int categoryId);
        bool DeleteProduct(Product product);
        bool Save();
    }
}
