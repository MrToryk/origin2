namespace WebAPI.Models
{
    public class Role
    {
        public int Id { get; set; }

        public string name { get; set; }

        public ICollection<User> RoleUsers { get; set; }
    }
}
