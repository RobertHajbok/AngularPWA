import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/tasting-rating';
import { Coffee } from '../logic/coffee';
import { DataService } from '../data.service';

@Component({
    selector: 'app-coffee',
    templateUrl: './coffee.component.html',
    styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

    coffee: Coffee;
    tastingEnabled: boolean = false;
    types = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino', 'Frappe'];

    constructor(private route: ActivatedRoute, private geolocation: GeolocationService, private router: Router, private data: DataService) { }

    routingSubscription: any;

    tastingRatingChanged(checked: boolean) {
        if (checked) {
            this.coffee.tastingRating = new TastingRating();
        } else {
            this.coffee.tastingRating = null;
        }
    }

    cancel() {
        this.router.navigate(['/']);
    }

    save() {
        this.data.save(this.coffee, result => {
            if (result) {
                this.router.navigate(['/']);
            }
        });
    }

    ngOnInit() {
        this.coffee = new Coffee();
        this.routingSubscription = this.route.params.subscribe(params => {
            console.log(params['id']);
            if (params['id']) {
                this.data.get(params['id'], response => {
                    this.coffee = response;
                    if (this.coffee.tastingRating) {
                        this.tastingEnabled = true;
                    }
                });
            }
        });

        this.geolocation.requestLocation(location => {
            if (location) {
                this.coffee.location.latitude = location.latitude;
                this.coffee.location.longitude = location.longitude;
            }
        })

    }

    ngOnDestroy() {
        this.routingSubscription.unsubscribe();
    }

}
