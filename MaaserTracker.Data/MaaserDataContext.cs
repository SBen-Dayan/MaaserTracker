using Microsoft.EntityFrameworkCore;

namespace MaaserTracker.Data
{
    public class MaaserDataContext : DbContext
    {
        private readonly string _connectionString;

        public MaaserDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Maaser> Maasers { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<IncomeSource> IncomeSources { get; set; }
    }
}
