namespace MaaserTracker.Data
{
    public class MaaserRepository
    {
        private readonly string _connectionString;

        public MaaserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Maaser> GetAll()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Maasers.ToList();
        }

        public decimal GetTotal()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Maasers.Sum(i => i.Amount);
        }

        public void Insert(Maaser maaser)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Maasers.Add(maaser);
            context.SaveChanges();
        }
    }
}
