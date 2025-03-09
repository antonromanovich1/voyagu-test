import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedMinutes',
})
export class FormattedMinutesPipe implements PipeTransform {
  transform(minutes: number) {
    if (minutes === null || minutes === undefined || isNaN(minutes)) {
      return '';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (remainingMinutes > 0) {
      return `${remainingMinutes}m`;
    } else {
      return '0m'; // Or any other default you want for 0 minutes.
    }
  }
}
