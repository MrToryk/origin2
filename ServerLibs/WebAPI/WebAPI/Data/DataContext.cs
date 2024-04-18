using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sale>()
                .HasKey(pt => new { pt.Transaction_id, pt.Product_id });
            modelBuilder.Entity<Sale>()
                .HasOne(p => p.Product)
                .WithMany(pt => pt.Sales)
                .HasForeignKey(p => p.Product_id);
            modelBuilder.Entity<Sale>()
                .HasOne(p => p.Transaction)
                .WithMany(pt => pt.Sales)
                .HasForeignKey(p => p.Transaction_id);
        }
    }
}
