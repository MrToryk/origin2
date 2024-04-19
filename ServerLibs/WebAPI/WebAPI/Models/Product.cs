namespace WebAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string name { get; set; }

        public double MinimalPrice { get; set; }

        public double SellingPrice { get; set; }

        public int StoredAmmount { get; set; }

        public DateOnly IssueDate { get; set; }

        public DateOnly? ExpireDate { get; set; }

        public User Owner_ { get; set; }

        public Category? Category_ { get; set; }

        public Discount? Discount_ { get; set; }

        public ICollection<Sale> Sales { get; set; }
    }
}
