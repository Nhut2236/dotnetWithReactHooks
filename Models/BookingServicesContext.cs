using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServices.Models
{
    public class BookingServicesContext : DbContext
    {
        public BookingServicesContext() { }
        public BookingServicesContext(DbContextOptions<BookingServicesContext> options) : base(options) { }
        public virtual DbSet<KhachHang> KhachHang { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Blog> Blog { get; set; }
        public virtual DbSet<Permission> Permission { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Event__3214EC07F198A74C"); ;

                entity.Property(e => e.Title).IsRequired().HasColumnType("ntext");

                entity.Property(e => e.Content).IsRequired().HasColumnType("ntext");

                entity.Property(e => e.Avatar).HasColumnType("ntext");

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.Address).HasColumnType("ntext");

                entity.Property(e => e.IsDelete).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsPublish).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsHighlight).HasDefaultValueSql("((0))");

                entity.Property(e => e.Price).HasColumnType("decimal(16, 3)");

                entity.Property(e => e.PeriodicType).HasMaxLength(50);

                entity.Property(e => e.PeriodicValue).HasMaxLength(50);

                entity.Property(e => e.InGroup).HasMaxLength(50);

                entity.Property(e => e.StartDate).HasMaxLength(20);

                entity.Property(e => e.EndDate).HasMaxLength(20);

                entity.Property(e => e.CreatedAt).HasMaxLength(20);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedAt).HasMaxLength(20);

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07F198A74D"); ;

                entity.Property(e => e.Name).IsRequired().HasMaxLength(30);

                entity.Property(e => e.Email).IsRequired().HasMaxLength(30);

                entity.Property(e => e.Address).IsRequired().HasMaxLength(30);

                entity.Property(e => e.UserName).IsRequired().HasMaxLength(30);

                entity.Property(e => e.Password).IsRequired().HasMaxLength(30);

                //entity.Property(e => e.Token).HasColumnType("ntext");

                //entity.Property(e => e.DateExpired).HasMaxLength(20);

                entity.Property(e => e.IsDelete).HasDefaultValueSql("((0))");

                entity.Property(e => e.CreatedAt).HasMaxLength(20);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedAt).HasMaxLength(20);

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);

                entity.Property(e => e.Avatar).HasColumnType("ntext");

                entity.Property(e => e.Permission).HasMaxLength(50);

                entity.Property(e => e.FacebookId).HasMaxLength(50);

                entity.Property(e => e.GoogleId).HasMaxLength(50);

            });

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Blog__3214EC07F198A74C"); ;

                entity.Property(e => e.Title).IsRequired().HasColumnType("ntext");

                entity.Property(e => e.Content).IsRequired().HasColumnType("ntext");

                entity.Property(e => e.Avatar).HasColumnType("ntext");

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.IsDelete).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsPublish).HasDefaultValueSql("((0))");

                entity.Property(e => e.InGroup).HasColumnType("ntext");

                entity.Property(e => e.CreatedAt).HasMaxLength(20);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedAt).HasMaxLength(20);

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.PositionName)
                    .HasMaxLength(300)
                    .ValueGeneratedNever();

                entity.Property(e => e.ViewEvent)
                    .HasColumnName("View_Event")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.CreateEvent)
                    .HasColumnName("Create_Event")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.UpdateEvent)
                    .HasColumnName("Update_Event")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.DeleteEvent)
                    .HasColumnName("Delete_Event")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.PublishEvent)
                    .HasColumnName("Publish_Event")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ViewBlog)
                    .HasColumnName("View_Blog")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.CreateBlog)
                    .HasColumnName("Create_Blog")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.UpdateBlog)
                   .HasColumnName("Update_Blog")
                   .HasDefaultValueSql("((0))");

                entity.Property(e => e.DeleteBlog)
                    .HasColumnName("Delete_Blog")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.PublishBlog)
                    .HasColumnName("Publish_Blog")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ViewUser)
                   .HasColumnName("View_User")
                   .HasDefaultValueSql("((0))");

                entity.Property(e => e.CreateUser)
                    .HasColumnName("Create_User")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.UpdateUser)
                   .HasColumnName("Update_User")
                   .HasDefaultValueSql("((0))");

                entity.Property(e => e.DeleteUser)
                    .HasColumnName("Delete_User")
                    .HasDefaultValueSql("((0))");

            });
        }
    }
}
