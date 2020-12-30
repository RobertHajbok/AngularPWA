import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Coffee } from './logic/coffee';
import { PlaceLocation } from './logic/place-location';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  get(coffeeId: number, callback) {
    this.http.get(`/api/coffees/${coffeeId}`).subscribe(response => {
      callback(response);
    });
  }

  getList(callback) {
    //const list = [
    //    new Coffee('Double Espresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
    //    new Coffee('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    //];
    //callback(list);
    this.http.get('/api/coffees').subscribe(response => {
      console.log(response);
      callback(response);
    });
  }

  save(coffee, callback) {
    if (coffee.id) {
      // It's an update
      this.http.put(`/api/coffees/${coffee.id}`, coffee, { responseType: 'text' }).subscribe(response => {
        callback(true);
      });
    } else {
      // It's an insert
      this.http.post('/api/coffees', coffee, { responseType: 'text' }).subscribe(response => {
        callback(true);
      });
    }
  }
}
