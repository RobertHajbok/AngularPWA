using AngularPWA.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularPWA.Controllers
{
  // This controller is just a dummy implementation for server-side calls
  [Route("api/[controller]")]
  public class CoffeesController : Controller
  {
    readonly List<Coffee> coffees = new List<Coffee>
    {
      new Coffee(1, "Double Espresso", "Sunny Cafe", new PlaceLocation("123 Market St", "San Francisco")),
      new Coffee(2, "Caramel Americano", "Starcoffee", new PlaceLocation("Gran Via 34", "Madrid"))
    };

    [HttpGet]
    public IEnumerable<Coffee> Get()
    {
      return coffees;
    }

    [HttpGet("{id}")]
    public Coffee Get(int id)
    {
      return coffees.Single(x => x.Id == id);
    }

    [HttpPost]
    public void Post([FromBody] Coffee coffee)
    {
      coffees.Add(coffee);
    }

    [HttpPut("{id}")]
    public void Put([FromBody] Coffee coffee, int id)
    {
      Coffee toUpdate = coffees.SingleOrDefault(x => x.Id == id);
      if (toUpdate != null)
      {
        coffees.Remove(toUpdate);
        coffees.Add(coffee);
      }
    }
  }
}
