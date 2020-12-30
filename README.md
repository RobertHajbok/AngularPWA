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
          services.AddMvc(options => options.EnableEndpointRouting = false).AddNewtonsoftJson();
       ```
      - In the same file, replace everything in the Configure method with the following:
       ```csharp
          app.Use(async (context, next) => {
            await next();
            if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value) &&
              !context.Request.Path.Value.StartsWith("/api/")) 
            {
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
      - Build and run the Web Application. The client-side should be built using --prod in order to test service workers.
        ```
          ng build -- prod & dotnet run
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
     - Open another terminal and start the Angular application using the port above
        ```
          http-server -p 62770 -c-1 wwwroot
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
      - To check if your product is a PWA, you have to start the angular app in production mode (with --prod in ng serve), because some of the PWA features are only available in production. In Google Chrome, open Developer Console (F12), go to Audits tab, click Perform an audit, and make sure the Progressive Web App checkbox is checked. This will build up a report for you which will show the passed/failed tests from the [PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist).
      - You can have links in your app to google maps or you can share information from your app. On mobile, this will open the native apps in a separate window, not in our app. You can check the [list component](https://github.com/HajbokRobert/AngularPWA/tree/master/AngularPWA/src/app/list) in the source code for examples.
      ``` typescript
        goMap(coffee: Coffee) {
            const mapURL = this.geolocation.getMapLink(coffee.location);
            location.href = mapURL;
        }

        share(coffee: Coffee) {
            const shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee`;
            if ('share' in navigator) {
                (navigator as any).share({
                    title: coffee.name,
                    text: shareText,
                    url: window.location.href
                }).then(() => {
                    console.log('shared');
                }).catch(() => {
                    console.log('error sharing');
                });
            } else {
                const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
                location.href = shareURL;
            }
        }
      ```
      - Create the [manifest.webmanifest](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/src/manifest.webmanifest) file in the root folder. There are also some sites which can create this file for you from a set options. This is a W3C spec for a website's metadata which defines the app's name, icons and icon names, installed behaviour, themes, colours and splash screens. Make sure you reference this file from index.html, as shown below. Then, in the [angular.json file](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/angular.json) and "manifest.webmanifest" in the assets array. If you add icons to the manifest file, do not forget to add the folder name to the assets in angular.json. You can test out these settings on an Android device.
      ``` html
        <link rel="manifest" href="manifest.webmanifest" />
      ```
      - You can set the site's theme colour from index.html as below. You can check this setting by viewing the status bar colour while testing the app on an Android device.
      ``` html
         <meta name="theme-color" content="#472D21" />
      ```
      - To check if the manifest file parameters are correctly set, you can open Developer Console on Chrome and switch to the Application tab. You can check the settings by clicking Manifest on the left side.
      - Do to the same for iOS, you have to add some meta tags to index.html, for example:
      ``` html
        <!-- iOS Meta Tags for PWA -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="AngularPWA" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="assets/icons/icon_ios_180.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="assets/icons/icon_ios_120.png" sizes="120x120" />
      ```
      - On Android devices, you can also navigate to chrome://flags/ and enable "improved add to Home screen". If this is checked, the application will be added as a real app to the device (not just a shortcut to home screen) and you can check that under Settings -> Applications sections.
      - It's recommended to give the users the possibility to install the application, if they are opening it from a web browser. The first step is to add the following piece of code in the ngOnInit function:
      ``` typescript
        if ((navigator as any).standalone == false) {
            // This is an iOS device and we are in the browser
            this.snackBar.open('You can add this PWA to the Home Screen', '', { duration: 3000 });
        }
        if ((navigator as any).standalone == undefined) {
            // It's not iOS
            if (window.matchMedia('(display-mode: browser').matches) {
                // We are in the browser
                window.addEventListener('beforeinstallprompt', event => {
                    event.preventDefault();
                    const sb = this.snackBar.open('Do you want to install this App?', 'Install', { duration: 5000 });
                    sb.onAction().subscribe(() => {
                        (event as any).prompt();
                        (event as any).userChoice.then(result => {
                            if (result.outcome == 'dismissed') {
                                //TODO: Track no installation 
                            } else {
                                //TODO: It was installed
                            }
                        });
                    });
                    return false;
                });
            }
        }
      ```
      - Next step is to add a service worker. In [angular.json file](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/angular.json), add the serviceWorker parameter under apps section and set it to true. Install the service-worker package and after a build in production mode you should see some new files in the wwwroot folder of your app (ngsw-config.json for example). Note that service workers are disabled in development mode.
      ```
        npm-install --save-dev @angular/service-worker
      ```
      - Build the Angular project in production mode to test if the user is given the possibility to install the app after starting it:
      ```
        http-server -p 62770 -c-1 wwwroot
      ```
      - You can check if service workers are running by opening Developer Console in Google Chrome, navigate to Application tab and select Service Workers on the left side. You can also check the Cache Storage. After selecting Service Workers, you can also check how your application is behaving while offline, using the Offline checkbox and refreshing the page.
      - To notify the user if the network status changes (online/offline) use the following code from [app.component.ts](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/src/app/app.component.ts):
      ``` typescript
        updateNetworkStatusUI() {
            if (navigator.onLine) {
                // You might be online
                (document.querySelector("body") as any).style = "";
            } else {
                // 100% Sure you are offline
                (document.querySelector("body") as any).style = "filter: grayscale(1)";
            }
        }
        
        ngOnInit() {
            this.updateNetworkStatusUI();
            window.addEventListener("online", this.updateNetworkStatusUI);
            window.addEventListener("offline", this.updateNetworkStatusUI);
        }
      ```
      - If you want your service workers to support application updates, you can use the following piece of code from [app.component.ts file](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/src/app/app.component.ts) in the ngAfterViewInit function:
      ``` typescript
          if (this.swUpdate.isEnabled) {
              this.swUpdate.available.subscribe(update => {
                  const sb = this.snackBar.open('There is an update available', 'Install Now', { duration: 4000 });
                  sb.onAction().subscribe(() => {
                      this.swUpdate.activateUpdate().then(event => {
                      console.log('The App was updated');
                      location.reload();
                  });
              });
          });
          this.swUpdate.checkForUpdate();
        }
      ```
      - You can also support push notifications by using the following piece of code from [app.component.ts file](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/src/app/app.component.ts):
      ``` typescript
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                this.swPush.requestSubscription({ serverPublicKey: 'replace-with-your-public-key' })
                    .then((registration: PushSubscription) => {
                        console.log(registration);
                        //TODO: Send that object to our server
                    });
            }
        });
      ```
      - Validate your website again with Lighthouse from Google Chrome Developer Tools as shown above, and hopefully you should see a much better score. To pass the "Disabled JavaScript" test from the checklist, you can add some content to the app-root element of the [index.html file](https://github.com/HajbokRobert/AngularPWA/blob/master/AngularPWA/src/index.html). This is because angular cannot be loaded with JavaScript being disabled.
