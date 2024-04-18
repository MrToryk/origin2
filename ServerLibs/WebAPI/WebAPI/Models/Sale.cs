namespace WebAPI.Models
{
    public class Sale
    {
        public int Transaction_id { get; set; }

        public int Product_id { get; set; }

        public int Amount { get; set; }

        public DateTime SaleDate { get; set; }

        public Discount Discount { get; set; }

        public Product Product { get; set; }

        public Transaction Transaction { get; set; }
    }
}
