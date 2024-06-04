using System.ComponentModel.DataAnnotations.Schema;

namespace MaaserTracker.Data
{
    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        [Column(TypeName = "money")]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
