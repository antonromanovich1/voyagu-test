import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormattedMinutesPipe } from '../../pipes/formatted-minutes.pipe';
import { FormatToAmPmPipe } from '../../pipes/format-to-am-pm.pipe';
import { FormatShortDayMonthPipe } from '../../pipes/format-short-day-month.pipe';
import { FlightDto } from '../../models/flight.model';

@Component({
  selector: 'app-flight-card',
  imports: [ButtonModule, CurrencyPipe, FormattedMinutesPipe, FormatToAmPmPipe, FormatShortDayMonthPipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  flightData = input.required<FlightDto>();
}
