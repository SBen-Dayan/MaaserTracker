using MaaserTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Web.Models;
using System.Security.Cryptography.Xml;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getAll")]
        public List<Income> GetIncomes() => new IncomeRepository(_connectionString).GetWithSources();

        [HttpPost("add")]
        public void AddIncome(IncomeModel model) => new IncomeRepository(_connectionString).Insert(new()
        {
            IncomeSourceId = model.IncomeSourceId,
            Date = model.Date,
            Amount = model.Amount,
        });
    }
}
