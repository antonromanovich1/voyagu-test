import { Component, effect, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { FlightService } from '../../services/flight.service';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, combineLatest, combineLatestWith, debounceTime, map, merge, startWith } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FilterKeysService } from '../../services/filter-keys.service';
import { StopsControlComponent } from '../stops-control/stops-control.component';
import { FlightDto } from '../../models/flight.model';

@Component({
  selector: 'app-flights',
  imports: [
    SelectModule,
    SliderModule,
    FormsModule,
    CheckboxModule,
    ButtonModule,
    AsyncPipe,
    FlightCardComponent,
    ReactiveFormsModule,
    CurrencyPipe,
    StopsControlComponent,
  ],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent implements OnInit {
  // default items quantity per page
  ITEMS_PER_PAGE = 5;

  // To change skip manually by pressing loadMore button
  skipManual$ = new BehaviorSubject(this.ITEMS_PER_PAGE);

  protected readonly sortOptions = [
    { label: 'Price (Lowest)', value: 'price-asc' },
    { label: 'Price (Highest)', value: 'price-desc' },
    { label: 'Departure (Early)', value: 'departure_time-asc' },
    { label: 'Departure (Late)', value: 'departure_time-desc' },
    { label: 'Duration  (Short)', value: 'duration_minutes-asc' },
    { label: 'Duration  (Long)', value: 'duration_minutes-desc' },
  ];

  private flightService = inject(FlightService);
  protected filterKeysService = inject(FilterKeysService);
  private fb = inject(NonNullableFormBuilder);

  filters$ = this.filterKeysService.filterData$;

  private readonly rangeInitialValueEffect = effect(() => {
    const filters = this.filters$();
    if (Object.keys(filters).length) {
      this.minRange = Math.floor(this.filters$().priceLow / 100) * 100;
      this.maxRange = Math.ceil(this.filters$().priceHigh / 100) * 100;

      const [firstStopOption] = filters.stops;

      this.rangeControl.setValue([this.filters$().priceLow, this.filters$().priceHigh]);
      this.stopsControl.setValue([firstStopOption.toString()]);
    }
  });

  readonly form = this.fb.group({
    sort: [this.sortOptions[0].value],
    range: [[0, 0]],
    stops: [['0']],
  });

  protected stopOptions: number[] = [];

  protected minRange = 500;
  protected maxRange = 6000;

  ngOnInit(): void {
    this.flightService.getFlights();
  }

  get stopsControl() {
    return this.form.get('stops') as FormControl;
  }

  get rangeControl() {
    return this.form.get('range') as FormControl;
  }

  get sortControl() {
    return this.form.get('sort') as FormControl;
  }

  // Maps value from stop control into cb function
  private readonly stops$ = this.stopsControl.valueChanges.pipe(
    map((value) => {
      return (arr: FlightDto[]) => {
        return arr.filter((flight) => flight.flights.some((f) => value.includes(f.stops.toString())));
      };
    }),
  );

  // Maps value from range control into cb function
  private readonly range$ = this.rangeControl.valueChanges.pipe(
    map((value) => {
      const [low, heigh] = value;
      return (arr: FlightDto[]) => {
        return arr.filter(({ price }) => price >= value[0] && price <= value[1]);
      };
    }),
  );

  // Maps value from sort control into cb function
  private readonly sort$ = this.sortControl.valueChanges.pipe(
    startWith(this.sortOptions[0].value),
    map((value) => {
      return this.createSortFunction(value);
    }),
  );

  // Combines all filters mapped to callbacks
  private readonly filtersChange$ = combineLatest([this.stops$, this.range$, this.sort$]).pipe(debounceTime(300));

  // Applies all callback
  private readonly filteredFlights$ = this.filtersChange$.pipe(
    combineLatestWith(this.flightService.flights$),
    map(([filters, flights]) => {
      return filters.reduce((acc: FlightDto[], cb: (arr: FlightDto[]) => FlightDto[]) => cb(acc), flights);
    }),
  );

  //To reset load more quantity on filtering change
  private readonly skip$ = merge(this.skipManual$, this.filtersChange$.pipe(map(() => this.ITEMS_PER_PAGE)));

  protected readonly flightsToShow$ = this.skip$.pipe(
    combineLatestWith(this.filteredFlights$),
    map(([skip, flights]) => flights.slice(0, skip)),
  );

  protected loadMore() {
    this.skipManual$.next(this.skipManual$.value + this.ITEMS_PER_PAGE);
  }

  // Define a separate sort function
  private createSortFunction(value: string): (arr: FlightDto[]) => FlightDto[] {
    const [key, order] = value.split('-');
    return (arr: FlightDto[]) => {
      return [...arr].sort((a, b) => {
        if (key in a) {
          return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
        } else {
          switch (key) {
            case 'departure_time':
              // Helper function to convert date and time strings to a Date object
              const getDateTime = (flight: any) => {
                // Parse date parts (from format DD-MM-YYYY)
                const [day, month, year] = flight.departure_date.split('-').map(Number);
                // Parse time parts (from format HH:MM)
                const [hours, minutes] = flight.departure_time.split(':').map(Number);

                // Create new Date object (months are 0-indexed in JavaScript)
                return new Date(year, month - 1, day, hours, minutes);
              };

              const aDateTime = getDateTime(a.flights[0]).getTime();
              const bDateTime = getDateTime(b.flights[0]).getTime();

              return order === 'asc' ? aDateTime - bDateTime : bDateTime - aDateTime;
            case 'duration':
              return order === 'asc'
                ? a.flights.reduce((acc, curr) => acc + curr[key], 0) -
                    b.flights.reduce((acc, curr) => acc + curr[key], 0)
                : b.flights.reduce((acc, curr) => acc + curr[key], 0) -
                    a.flights.reduce((acc, curr) => acc + curr[key], 0);
            default:
              return order === 'asc' ? a.flights[0][key] - b.flights[0][key] : b.flights[0][key] - a.flights[0][key];
          }
        }
      });
    };
  }
}
