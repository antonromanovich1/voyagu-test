import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyDecimalSeparatePipe } from '../../pipes/currency-decimal-separate.pipe';

@Component({
  selector: 'app-book-form',
  imports: [CurrencyDecimalSeparatePipe, CurrencyPipe],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {}
