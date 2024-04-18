namespace WebAPI.Models
{
    public class Discount
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int DiscountValue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public ICollection<Sale> DiscountSales { get; set; }

        public ICollection<Product> DiscountProducts { get; set; }
    }
}
