using System.ComponentModel.DataAnnotations.Schema;

namespace MaaserTracker.Data
{
    public class Income
    {
        public int Id { get; set; }
        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int IncomeSourceId { get; set; }

        public IncomeSource IncomeSource { get; set; }
    }
}