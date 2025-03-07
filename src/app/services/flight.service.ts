import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private BASE_URL = 'https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json';

  private http = inject(HttpClient);

  getFlights() {
    return this.http.get(this.BASE_URL);
  }
}
