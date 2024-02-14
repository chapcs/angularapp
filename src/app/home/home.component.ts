import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, HousingLocationComponent ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
    *ngFor="let housingLocation of housingLocationList"
    [housingLocation]="housingLocation"></app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.css'],
})
/*export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocation: HousingLocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test City',
    state: 'ST',
    photo: '${this.baseUrl}/example-house.jpg',
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };
}*/
// Removed single test to utilize a list instead
// By adding the housingLocation property of type Housinglocation to the HomeComponent class, we're able to confirm that the data matches the description of the interface

export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
// Moved data list from here to the housing.service.ts, added code to inject the service and initialize the data for the app
