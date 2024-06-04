using Microsoft.EntityFrameworkCore;

namespace MaaserTracker.Data
{
    public class IncomeSourceRepository
    {
        private readonly string _connectionString;

        public IncomeSourceRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<IncomeSource> GetAll()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.IncomeSources.ToList();
        }

        public void Insert(IncomeSource incomeSource)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.IncomeSources.Add(incomeSource);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM IncomeSources WHERE Id = {id}");
        }

        public void Update(IncomeSource incomeSource)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE IncomeSources SET Source = {incomeSource.Source} WHERE Id = {incomeSource.Id}");
        }
    }
}
