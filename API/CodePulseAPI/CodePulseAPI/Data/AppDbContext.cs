using CodePulseAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CodePulseAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Postagem> Postagens { get; set; }
}
