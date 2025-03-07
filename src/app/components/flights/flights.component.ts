import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { FlightService } from '../../services/flight.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flights',
  imports: [SelectModule, SliderModule, FormsModule, CheckboxModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  protected readonly sortOptions = [
    { label: 'Price (Lowest)', value: 'price-low' },
    { label: 'Price (Highest)', value: 'price-high' },
    { label: 'Departure (Early)', value: 'dep-early' },
    { label: 'Departure (Late)', value: 'dep-late' },
    { label: 'Duration  (Short)', value: 'duration' },
  ];

  protected readonly stopOptions = [
    { label: 'All stops', value: 'all-stop' },
    { label: 'Nonstop', value: 'non-stop' },
    { label: '1 stop', value: 'one-stop' },
    { label: '2 stops', value: 'two-stop' },
  ];

  rangeValues: number[] = [0, 100];
}
