# AngularPWA
Angular Progresive Web Application setup and steps

## Main steps
  1. Project setup (https://medium.com/@levifuller/building-an-angular-application-with-asp-net-core-in-visual-studio-2017-visualized-f4b163830eaa) highlights:
      - Create an empty ASP.NET Core project
      - In the .csproj file, disable TypeScript compilation errors:
        ```
          <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
        ```
      - Open the Startup.cs, and in the ConfigureServices add:
       ```csharp
          services.AddMvc();
       ```
      - In the same file, replace everything in the Configure method with the following:
       ```csharp
          app.Use(async (context, next) => {
            await next();
            if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) &&
              !context.Request.Path.Value.StartsWith("/api/")) {
                context.Request.Path = "/index.html";
                 await next();
            }
          });
          
          app.UseMvcWithDefaultRoute();
          
          app.UseDefaultFiles();
          app.UseStaticFiles();
       ```
      - Right-click project file -> Open Command Line -> Default (cmd) and install the Angular-CLI 
       ```
          npm install @angular/cli --global
       ```
      - Scaffold a new Angular application and move the generated files to the root of the project
       ```
          ng new {kebab-cased-app-name-here} --skip-install
       ```
      - In the .angular-cli.json file set the outDir parameter to wwwroot. When the Angular-CLI to builds the application, it will now output the assets to the /wwwroot directory — the same directory we configured ASP.NET Core to serve static files from.
      - Install the Angular application’s dependencies
        ```
          npm install
        ```
      - Build and run the Web Application
        ```
          ng build & dotnet run
        ```
      - During development, we should use the ng serve command which watches for changes to your Angular code, transpiles the TypeScript code, and re-serves it to localhost:4200, by default.
Since your Angular application is being served on a different port than the API, it will send requests to localhost:4200/api instead of our API which is running on localhost:5000, by default. To achieve this, we need to create a proxy.config.json file and add the following lines:
        ```
          {
             "/api": {
                "target": "http://localhost:5000",
                "secure": false
             }
          }
        ```
      - Enable automatic re-compilation for ASP.NET Core by adding the following ItemGroup to the .csproj file
        ```
          <ItemGroup>
             <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="1.0.0" />
          </ItemGroup>
        ```
      - Open a terminal in the project directory and start the ASP.NET Core server
        ```
          dotnet watch run
        ```
     - Open another terminal and start the Angular application
        ```
          ng serve --proxy-config proxy.config.json
        ```
      - If you want your Angular app to be built for production environment whenever you publish, add the following to the .csproj file:
        ```
          <Target Name="Build Angular" Condition="'$(Configuration)'=='Release'" BeforeTargets="Build">    
             <Message Text="* * * * * * Building Angular App * * * * * *" Importance="high" />
             <Exec Command="ng build -prod -aot" />
          </Target>
        ```
      - Open a browser window and navigate to http://localhost:4200. You can start developing!
  2. Progressive Web App steps (https://www.lynda.com/Angular-tutorials/Angular-Progressive-Web-Apps/590845-2.html) highlighted:
