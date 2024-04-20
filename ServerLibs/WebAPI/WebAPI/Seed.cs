using WebAPI.Models;
using WebAPI.Data;

namespace WebAPI
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.Sales.Any())
            {
                var categories = new List<Category>()
                {
                    new Category()
                    {
                        Name = "TestCategory"
                    }
                };
                dataContext.Categories.AddRange(categories);
                dataContext.SaveChanges();
            }
        }
    }
}
