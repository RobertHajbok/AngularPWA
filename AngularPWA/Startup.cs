using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

namespace AngularPWA
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc(options => options.EnableEndpointRouting = false).AddNewtonsoftJson();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      // Redirect any non-API calls to the Angular application so our application can handle the routing
      app.Use(async (context, next) =>
      {
        await next();
        if (context.Response.StatusCode == 404 &&
                 !Path.HasExtension(context.Request.Path.Value) &&
                 !context.Request.Path.Value.StartsWith("/api/"))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });

      // Configures application for usage as API with default route of '/api/[Controller]'
      app.UseMvcWithDefaultRoute();

      // Configures application to serve the index.html file from /wwwroot when you access the server from a web browser
      app.UseDefaultFiles();
      app.UseStaticFiles();
    }
  }
}
