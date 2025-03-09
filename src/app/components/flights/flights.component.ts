import { Component, effect, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { FlightService } from '../../services/flight.service';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FilterKeysService } from '../../services/filter-keys.service';
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

  filters$ = this.filterKeysService.filterData$;

  rangeInitialValueEffect = effect(() => {
    const filters = this.filters$();
    if (Object.keys(filters).length) {
      this.minRange = Math.floor(this.filters$().priceLow / 100) * 100;
      this.maxRange = Math.ceil(this.filters$().priceHigh / 100) * 100;

      this.form.get('range')?.setValue([this.filters$().priceLow, this.filters$().priceHigh]);
      console.log(this.form.value, this.minRange, this.maxRange);
    }
  });

  readonly form = this.fb.group({
    sort: [this.sortOptions[0].value],
    range: [[0, 0]],
    stops: [],
  });

  protected stopOptions: number[] = [];

  protected minRange = 500;
  protected maxRange = 6000;

  ngOnInit(): void {
    this.flightService.getFlights();
  }

  flightsToShow$ = this.flightService.flights$.pipe(map((flights) => flights.slice(0, this.ITEMS_PER_PAGE)));
  // skip$ = new BehaviorSubject(this.ITEMS_PER_PAGE);
  // sort$ = new BehaviorSubject('price-low');
  // range$ = new BehaviorSubject(this.rangeValues);
}
