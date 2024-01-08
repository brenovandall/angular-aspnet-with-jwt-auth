using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulseAPI.Data;

public class AuthDbContext : IdentityDbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);


        var readerId = "e423583e-5c26-499e-bbc4-6be925e962a4";
        var writerId = "07f0d0fa-86e3-4253-8374-9fb102dd2288";
        var roles = new List<IdentityRole>()
        {
            new IdentityRole()
            {
                Id = readerId,
                Name = "reader",
                NormalizedName = "reader".ToUpper(),
                ConcurrencyStamp = readerId
            },
            new IdentityRole()
            {
                Id = writerId,
                Name = "writer",
                NormalizedName = "writer".ToUpper(),
                ConcurrencyStamp = writerId
            }
        };

        builder.Entity<IdentityRole>().HasData(roles);

        var admin = new IdentityUser()
        {
            Id = "e468b9c4-546d-4eb2-aa0d-20c520a82ea4",
            UserName = "admin",
            Email = "admin@email.com",
            NormalizedEmail = "admin@email.com".ToUpper(),
            NormalizedUserName = "admin".ToUpper(),
        };

        admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

        builder.Entity<IdentityUser>().HasData(admin);

        var adminRoles = new List<IdentityUserRole<string>>()
        {
            new IdentityUserRole<string>()
            {
                UserId = "e468b9c4-546d-4eb2-aa0d-20c520a82ea4",
                RoleId = readerId,
            },
            new IdentityUserRole<string>()
            {
                UserId = "e468b9c4-546d-4eb2-aa0d-20c520a82ea4",
                RoleId = writerId,
            }
        };

        builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
    }
}
