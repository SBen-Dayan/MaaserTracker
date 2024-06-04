using System.ComponentModel.DataAnnotations.Schema;

namespace ReactMaaserTrackerMUI_Starter.Web.Models
{
    public class IncomeModel
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int IncomeSourceId { get; set; }
    }
}
