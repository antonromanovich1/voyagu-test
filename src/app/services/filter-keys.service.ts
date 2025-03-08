import { Injectable, signal } from '@angular/core';
import { FlightDto } from '../models/flight.model';
import { BehaviorSubject } from 'rxjs';

export type FilterData = { priceHigh: number; priceLow: number; stops: number[] };

@Injectable({
  providedIn: 'root',
})
export class FilterKeysService {
  filterKeys = [
    'airline',
    'arrival_airport',
    'arrival_date',
    'arrival_time',
    'departure_airport',
    'departure_date',
    'departure_time',
    'duration_minutes',
    'stops',
  ];

  // public filtersData: FilterData = {} as FilterData;
  public filtersData$ = new BehaviorSubject<FilterData>({} as FilterData);

  public buildFilterKeys(data: FlightDto[]) {
    const filters = data.reduce((acc, { price, flights }) => {
      acc.priceHigh = Math.max(acc.priceHigh || 0, price);
      acc.priceLow = Math.min(acc.priceLow || price, price);
      const stops = flights.map((flight) => flight.stops);
      stops.forEach((stop) => {
        if (!acc.stops) {
          acc.stops = [];
        }
        if (!acc.stops.includes(stop)) {
          acc.stops.push(stop);
        }
      });
      return acc;
    }, {} as FilterData);
    this.filtersData$.next(filters);
  }

  private splitArray<T extends []>(arr: T, size: number) {
    var chunks = [];
    for (var i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
}
