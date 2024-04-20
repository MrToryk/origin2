using WebAPI.Models;

namespace WebAPI.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double MinimalPrice { get; set; }
        public double SellingPrice { get; set; }
        public int StoredAmmount { get; set; }
        public DateOnly IssueDate { get; set; }
        public DateOnly? ExpireDate { get; set; }
    }
}
