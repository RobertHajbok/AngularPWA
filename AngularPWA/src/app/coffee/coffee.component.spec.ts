import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoffeeComponent } from './coffee.component';

describe('CoffeeComponent', () => {
    let component: CoffeeComponent;
    let fixture: ComponentFixture<CoffeeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CoffeeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoffeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
