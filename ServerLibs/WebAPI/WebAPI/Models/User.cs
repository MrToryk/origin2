﻿namespace WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public Role Role { get; set; }

        public ICollection<Product> UserProducts { get; set; }

        public ICollection<Transaction> UserTransactions { get; set; }
    }
}