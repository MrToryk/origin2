namespace WebAPI.Dto
{
    public class DiscountDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int DiscountValue { get; set; }
        public DateTime StartingDate { get; set; }
        public DateTime EndingDate { get; set; }
    }
}
