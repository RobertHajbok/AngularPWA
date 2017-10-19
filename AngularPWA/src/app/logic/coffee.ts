import { TastingRating } from "./tasting-rating";
import { PlaceLocation } from "./place-location";

export class Coffee {

    // Properties
    type: string;
    rating: number;
    notes: string;
    tastingRating: TastingRating;

    constructor(public name: string = "", public place: string = "", public location: PlaceLocation = null) {
        this.location = new PlaceLocation();
        this.tastingRating = new TastingRating();
    }

}
