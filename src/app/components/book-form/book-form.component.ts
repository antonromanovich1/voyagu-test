import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CurrencyDecimalSeparatePipe } from '../../pipes/currency-decimal-separate.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  imports: [CurrencyDecimalSeparatePipe, CurrencyPipe],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  totalPrice = inject(Router).getCurrentNavigation()?.extras?.state?.['totalPrice'];
}
