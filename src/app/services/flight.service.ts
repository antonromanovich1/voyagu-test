import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlightDto } from '../models/flight.model';
import { FilterKeysService } from './filter-keys.service';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private BASE_URL = 'https://public-front-bucket.s3.eu-central-1.amazonaws.com/test/test_flights.json';

  private http = inject(HttpClient);
  private filterKeysService = inject(FilterKeysService);

  public flights$ = new BehaviorSubject<FlightDto[]>([]);

  getFlights() {
    this.http.get<FlightDto[]>(this.BASE_URL).subscribe({
      next: (flights) => {
        this.flights$.next(flights);
        this.filterKeysService.buildFilterKeys(flights);
      },
      error: (err) => console.error(err),
    });
  }
}
