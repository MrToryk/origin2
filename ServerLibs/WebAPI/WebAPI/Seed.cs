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
                var sales = new List<Sale>()
                {
                    new Sale()
                    {
                        Product = new Product()
                        {
                            name = "Pikachu",
                            MinimalPrice = 19,
                            SellingPrice = 39,
                            StoredAmmount = 14,
                            IssueDate = new DateOnly(2022,3,23),
                            ExpireDate = new DateOnly(2032,1,1),
                            
                        },
                        Transaction = new Transaction()
                        {
                            Amount = 1,
                            User = new User()
                            {
                                name = "UNKNOWN",
                                Password = "UNDEFINED",
                                Role = new Role()
                                {
                                    name = "God"
                                }
                            }
                        }
                    },
                };
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
