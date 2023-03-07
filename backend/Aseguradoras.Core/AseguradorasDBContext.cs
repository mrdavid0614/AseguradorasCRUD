using Aseguradoras.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Aseguradoras.Core
{
    public class AseguradorasDBContext : DbContext
    {
        public AseguradorasDBContext (DbContextOptions options) : base (options) { }
        public DbSet<Aseguradora> Aseguradoras { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aseguradora>().HasKey(a => a.Id);
            base.OnModelCreating(modelBuilder);
        }
    }
}
