import { Injectable } from '@angular/core';
import { Coffee } from './logic/coffee';
import { PlaceLocation } from './logic/place-location';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    get(coffeeId: number, callback) {
        this.http.get(`/api/coffees/${coffeeId}`).subscribe(response => {
            callback(response.json());
        });
    }

    getList(callback) {
        //const list = [
        //    new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
        //    new Coffee('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid'))
        //];
        //callback(list);
        this.http.get('/api/coffees').subscribe(response => {
            console.log(response.json());
            callback(response.json());
        });
    }

    save(coffee, callback) {
        if (coffee.id) {
            // It's an update
            this.http.put(`/api/coffees/${coffee.id}`, coffee).subscribe(response => {
                callback(true);
            });
        } else {
            // It's an insert
            this.http.post('/api/coffees', coffee).subscribe(response => {
                callback(true);
            });
        }
    }
}
