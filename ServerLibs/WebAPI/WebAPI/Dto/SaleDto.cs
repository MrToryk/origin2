namespace WebAPI.Dto
{
    public class SaleDto
    {
        public int Id { get; set; }
        public int SoldAmount { get; set; }
        public double PricePerUnit { get; set; }
        public DateTime SaleDate { get; set; }
    }
}
