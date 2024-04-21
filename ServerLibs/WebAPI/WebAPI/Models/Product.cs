namespace WebAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double MinimalPrice { get; set; }
        public double SellingPrice { get; set; }
        public int StoredAmount { get; set; }
        public DateOnly IssueDate { get; set; }
        public DateOnly? ExpireDate { get; set; }
        public User Owner { get; set; }
        public Category? Category { get; set; }
        public Discount? Discount { get; set; }
        public ICollection<Sale> ProductSales { get; set; }
    }
}
