import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { FlightService } from '../../services/flight.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { ButtonModule } from 'primeng/button';
import { filter, map, take, withLatestFrom } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FilterKeysService } from '../../services/filter-keys.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StopsControlComponent } from '../stops-control/stops-control.component';

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
  ITEMS_PER_PAGE = 5;

  protected readonly sortOptions = [
    { label: 'Price (Lowest)', value: 'price-low' },
    { label: 'Price (Highest)', value: 'price-high' },
    { label: 'Departure (Early)', value: 'dep-early' },
    { label: 'Departure (Late)', value: 'dep-late' },
    { label: 'Duration  (Short)', value: 'duration' },
  ];

  private flightService = inject(FlightService);
  protected filterKeysService = inject(FilterKeysService);
  private fb = inject(NonNullableFormBuilder);
  private destroyRef$ = inject(DestroyRef);

  filtersData$ = this.filterKeysService.filtersData$;

  readonly form = this.fb.group({
    sort: [this.sortOptions[0].value],
    range: [[0, 0]],
    stopss: [],
  });

  protected stopOptions: number[] = [];

  protected minRange = 500;
  protected maxRange = 6000;

  ngOnInit(): void {
    this.flightService.getFlights();
    this.filtersData$
      .pipe(
        takeUntilDestroyed(this.destroyRef$),
        filter((f) => !!f.priceHigh),
      )
      .subscribe((filters) => {
        if (filters.priceHigh) {
          this.minRange = Math.floor(filters.priceLow / 100) * 100;
          this.maxRange = Math.ceil(filters.priceHigh / 100) * 100;

          this.form.get('range')?.setValue([filters.priceLow, filters.priceHigh]);

          const stops = [] as number[];

          filters.stops.forEach((stop) => {
            stops.push(stop);
          });

          this.stopOptions = stops;
        }
      });
  }

  flightsToShow$ = this.flightService.flights$.pipe(map((flights) => flights.slice(0, this.ITEMS_PER_PAGE)));
  // skip$ = new BehaviorSubject(this.ITEMS_PER_PAGE);
  // sort$ = new BehaviorSubject('price-low');
  // range$ = new BehaviorSubject(this.rangeValues);
}
