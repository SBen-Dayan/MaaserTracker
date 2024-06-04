using MaaserTracker.Data;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OverviewController : ControllerBase
    {
        private readonly string _connectionString;

        public OverviewController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("get")]
        public Overview GetOverview()
        {
            var totalIncome = new IncomeRepository(_connectionString).GetTotal();
            var totalMaaser = new MaaserRepository(_connectionString).GetTotal();
            return new Overview
            {
                TotalIncome = totalIncome,
                TotalMaaser = totalMaaser,
                MaaserObligated = totalIncome / 10,
                RemainingObligation = (totalIncome / 10) - totalMaaser
            };
        }
    }
}
