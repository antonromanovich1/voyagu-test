import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatToAmPm',
})
export class FormatToAmPmPipe implements PipeTransform {
  transform(timeString: string): string {
    if (!timeString) {
      return '';
    }

    const timeRegex = /^([0-9]{1,2}):([0-9]{2})(?::[0-9]{2})?$/; // Matches HH:MM or HH:MM:SS
    const match = timeString.match(timeRegex);

    if (!match) {
      return 'Invalid time format';
    }

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const seconds = match[3] ? match[3].substring(1) : '00';

    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle 12 am

    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes}${ampm}`;
  }
}
