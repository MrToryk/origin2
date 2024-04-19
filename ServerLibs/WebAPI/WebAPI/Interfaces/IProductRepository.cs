using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IProductRepository
    {
        ICollection<Product> GetProducts();
        Product GetProduct(int id);
        Product GetProduct(string name);
        int GetProductSales(int id);
        bool ProductExists(int id);
    }
}
