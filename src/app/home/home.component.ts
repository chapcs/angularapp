import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    CommonModule, 
    HousingLocationComponent, 
  ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
    *ngFor="let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation"></app-housing-location>
  </section>
`,
  styleUrls: ['./home.component.css'],
})
// By binding to the click event on the button element, you are able to call the filterResults function. The argument to the function is the value property of the filter template variable. Specifically, the .value property from the input HTML element.
// Removed single test to utilize a list instead
// By adding the housingLocation property of type Housinglocation to the HomeComponent class, we're able to confirm that the data matches the description of the interface

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()) || housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
// Moved data list from here to the housing.service.ts, added code to inject the service and initialize the data for the app
