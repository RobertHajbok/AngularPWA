using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularPWA.Controllers
{
  // This controller is just a dummy implementation for server-side calls
  [Route("api/[controller]")]
  public class CoffeesController : Controller
  {
    List<Coffee> coffees = new List<Coffee>
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
    public void Post([FromBody]Coffee coffee)
    {
      coffees.Add(coffee);
    }

    [HttpPut("{id}")]
    public void Put([FromBody]Coffee coffee, int id)
    {
      Coffee toUpdate = coffees.SingleOrDefault(x => x.Id == id);
      if (toUpdate != null)
      {
        coffees.Remove(toUpdate);
        coffees.Add(coffee);
      }
    }
  }

  public class Coffee
  {
    public Coffee(int id, string name, string place, PlaceLocation location)
    {
      Id = id;
      Name = name;
      Place = place;
      Location = location;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string Place { get; set; }
    public PlaceLocation Location { get; set; }
  }

  public class PlaceLocation
  {
    public PlaceLocation(string address, string city)
    {
      Address = address;
      City = city;
    }

    public string Address { get; set; }
    public string City { get; set; }
  }
}
