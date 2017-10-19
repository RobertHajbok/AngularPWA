import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    constructor(private snackBar: MatSnackBar, private ngsw: NgServiceWorker) { }

    updateNetworkStatusUI() {
        if (navigator.onLine) {
            // You might be online
            (document.querySelector("body") as any).style = "";
        } else {
            // 100% Sure you are offline
            (document.querySelector("body") as any).style = "filter: grayscale(1)";
        }
    }

    subscribeToPush() {
        Notification.requestPermission(permission => {
            if (permission === "granted") {
                this.ngsw.registerForPush({ applicationServerKey: "replace-with-your-public-key" })
                    .subscribe((registration: NgPushRegistration) => {
                        console.log(registration);
                        //TODO Send that object to our server
                    })
            }
        })
    }

    ngOnInit() {
        // Checking SW Update Status
        this.ngsw.updates.subscribe(update => {
            if (update.type == 'pending') {
                const sb = this.snackBar.open("There is an update available", "Install Now", { duration: 4000 });
                sb.onAction().subscribe(() => {
                    this.ngsw.activateUpdate(update.version).subscribe(event => {
                        console.log("The App was updated");
                        location.reload();
                    })
                });

            }
        });
        this.ngsw.checkForUpdate();

        // Checking Network Status
        this.updateNetworkStatusUI();
        window.addEventListener("online", this.updateNetworkStatusUI);
        window.addEventListener("offline", this.updateNetworkStatusUI);

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
    }
}
