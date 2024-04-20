using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IProductRepository
    {
        ICollection<Product> GetProducts();
        Product GetProduct(int id);
        Product GetProduct(string name);
        int GetProductSaleNumber(int prodId);
        bool ProductExists(int id);
    }
}
