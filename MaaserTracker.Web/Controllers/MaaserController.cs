using MaaserTracker.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;

        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getAll")]
        public List<Maaser> GetAll() => new MaaserRepository(_connectionString).GetAll();

        [HttpPost("add")]
        public void Add(MaaserModel model) => new MaaserRepository(_connectionString).Insert(new()
        {
            Amount = model.Amount,
            Recipient = model.Recipient,
            Date = model.Date
        });


    }
}
