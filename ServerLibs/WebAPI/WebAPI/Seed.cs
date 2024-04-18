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
                            Name = "Pikachu",
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
                                Name = "UNKNOWN",
                                Password = "UNDEFINED",
                                Role = new Role()
                                {
                                    Name = "God"
                                }
                            }
                        }
                    },
                };
                dataContext.Sales.AddRange(sales);
                dataContext.SaveChanges();
            }
        }
    }
}
