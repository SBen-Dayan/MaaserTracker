using System.ComponentModel.DataAnnotations.Schema;

namespace ReactMaaserTrackerMUI_Starter.Web.Models
{
    public class MaaserModel
    {
        public string Recipient { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
