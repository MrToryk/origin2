namespace WebAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        public float Amount { get; set; }

        public User User { get; set; }

        public ICollection<Sale> Sales { get; set; }
    }
}
