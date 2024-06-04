using System.Text.Json.Serialization;

namespace MaaserTracker.Data
{
    public class IncomeSource
    {
        public int Id { get; set; }
        public string Source { get; set; }
        [JsonIgnore]
        public List<Income> Incomes { get; set; }
    }
}
