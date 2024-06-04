using MaaserTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeSourceController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomeSourceController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getAll")]
        public List<IncomeSource> GetIncomeSources() => new IncomeSourceRepository(_connectionString).GetAll();

        [HttpPost("add")]
        public void AddIncomeSource(IncomeSourceModel model) => new IncomeSourceRepository(_connectionString).Insert(new()
        { Source = model.Source });

        [HttpPost("edit")]
        public void EditIncomeSource(IncomeSource incomeSource) => new IncomeSourceRepository(_connectionString).Update(incomeSource);

        [HttpPost("delete")]
        public void DeleteIncomeSource(IdModel model) => new IncomeSourceRepository(_connectionString).Delete(model.Id);
    }
}
