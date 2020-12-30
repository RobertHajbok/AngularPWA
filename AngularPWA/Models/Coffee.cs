namespace AngularPWA.Models
{
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
}
