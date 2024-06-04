using Microsoft.EntityFrameworkCore;

namespace MaaserTracker.Data
{
    public class IncomeRepository
    {
        private readonly string _connectionString;

        public IncomeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Income> GetWithSources()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Incomes.Include(i => i.IncomeSource).ToList();
        }

        public decimal GetTotal()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Incomes.Sum(i => i.Amount);
        }

        public void Insert(Income income)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Incomes.Add(income);
            context.SaveChanges();
        }
    }
}
