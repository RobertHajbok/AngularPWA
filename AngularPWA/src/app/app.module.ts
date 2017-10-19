import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GeolocationService } from "./geolocation.service";
import { DataService } from "./data.service";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatToolbarModule, MatCardModule, MatSlideToggleModule } from '@angular/material';
import 'hammerjs';
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'coffee', component: CoffeeComponent },
    { path: 'coffee/:id', component: CoffeeComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        CoffeeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatToolbarModule,
        MatCardModule,
        MatSlideToggleModule,
        RouterModule.forRoot(routes)
    ],
    providers: [GeolocationService, DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
