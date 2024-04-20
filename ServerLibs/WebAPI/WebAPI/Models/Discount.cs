namespace WebAPI.Models
{
    public class Discount
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int DiscountValue { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime EndingDate { get; set; }
        public ICollection<Product> DiscountProducts { get; set; }
    }
}
