using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICategoryRepository
    {
        ICollection<Category> GetCategories();
        Category GetCategory(int id);
        ICollection<Product> GetProductsByCategory(int catId);
        bool CategoryExists(int id);
    }
}
