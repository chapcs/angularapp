import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}


/*url = 'http://localhost:3000/locations';

constructor(private http: HttpClient) {}

async getAllHousingLocations(): Promise<HousingLocation[]> {
  const data = await this.http.get<HousingLocation[]>(this.url).toPromise();
  return data ?? [];
}

async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
  const data = await this.http.get<HousingLocation>('&{this.url}/${id}').toPromise();
  return data ?? {} as HousingLocation;
}*/