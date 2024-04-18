namespace WebAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public float MinimalPrice { get; set; }

        public float SellingPrice { get; set; }

        public int StoredAmmount { get; set; }

        public DateOnly IssueDate { get; set; }

        public DateOnly ExpireDate { get; set; }

        public User User { get; set; }

        public Category Category { get; set; }

        public Discount Discount { get; set; }

        public ICollection<Sale> Sales { get; set; }
    }
}
