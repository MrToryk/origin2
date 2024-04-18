using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IProductRepository
    {
        ICollection<Product> GetProducts();
    }
}
