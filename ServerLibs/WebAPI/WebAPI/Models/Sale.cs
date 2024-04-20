namespace WebAPI.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int SoldAmount { get; set; }
        public double PricePerUnit { get; set; }
        public DateTime SaleDate { get; set; }
        public User User { get; set; }
        public Product Product { get; set; }
    }
}
