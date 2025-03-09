import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'currencyDecimalSeparate',
})
export class CurrencyDecimalSeparatePipe implements PipeTransform {
  private currencyPipe = inject(CurrencyPipe);
  private sanitizer = inject(DomSanitizer);

  transform(value: number | string | null | undefined): SafeHtml {
    if (value == null || value === '') {
      return '';
    }

    const formattedCurrency = this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2') || '';
    const parts = formattedCurrency.split('.');

    if (parts.length === 2) {
      const whole = parts[0];
      const decimal = parts[1];
      const safeHtml = `<span class="currency-whole">${whole}</span><span class="currency-decimal">.${decimal}</span>`;
      return this.sanitizer.bypassSecurityTrustHtml(safeHtml);
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(formattedCurrency);
    }
  }
}
