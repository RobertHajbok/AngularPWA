namespace AngularPWA.Models
{
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
