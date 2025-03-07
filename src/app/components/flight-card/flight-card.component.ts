import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormattedMinutesPipe } from '../../pipes/formatted-minutes.pipe';
import { FormatToAmPmPipe } from '../../pipes/format-to-am-pm.pipe';
import { FormatShortDayMonthPipe } from '../../pipes/format-short-day-month.pipe';

const mock = {
  flights: [
    {
      airline: 'KL',
      arrival_airport: 'AMS',
      arrival_date: '2025-06-17',
      arrival_time: '20:20:00',
      departure_airport: 'BER',
      departure_date: '2025-06-17',
      departure_time: '18:50:00',
      duration_minutes: 90,
      stops: 0,
    },
    {
      airline: 'KL',
      arrival_airport: 'KUL',
      arrival_date: '2025-06-22',
      arrival_time: '15:35:00',
      departure_airport: 'AMS',
      departure_date: '2025-06-21',
      departure_time: '21:15:00',
      duration_minutes: 740,
      stops: 0,
    },
  ],
  id: 304613,
  price: 2363.2,
};

@Component({
  selector: 'app-flight-card',
  imports: [ButtonModule, CurrencyPipe, FormattedMinutesPipe, FormatToAmPmPipe, FormatShortDayMonthPipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  flightData = mock;
}
