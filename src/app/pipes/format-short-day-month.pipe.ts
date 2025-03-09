import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatShortDayMonth',
})
export class FormatShortDayMonthPipe implements PipeTransform {
  private datePipe = inject(DatePipe);
  transform(dateString: string) {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Check for invalid date
      return 'Invalid Date';
    }

    return this.datePipe.transform(date, 'MMM dd');
  }
}
