using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularPWA.Controllers
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {
    // GET: api/values
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return new string[] { "Bro", "Do", "You", "Even", "Code?" };
    }
  }
}
