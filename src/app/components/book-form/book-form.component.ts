import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CurrencyDecimalSeparatePipe } from '../../pipes/currency-decimal-separate.pipe';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TravellerFormService } from '../../services/traveller-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { countryList } from '../../constants/countries.constants';

@Component({
  selector: 'app-book-form',
  imports: [
    CurrencyDecimalSeparatePipe,
    CurrencyPipe,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    SelectModule,
    DatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  protected totalPrice = inject(Router).getCurrentNavigation()?.extras?.state?.['totalPrice'];

  private formService = inject(TravellerFormService);
  private router = inject(Router);

  form = this.formService.form;

  // TODO: should depend on month field and be updated accordingly - out of scope atm
  protected readonly days = Array.from({ length: 31 }, (_, i) => i + 1);
  protected readonly countries = countryList;

  onConfirmClick() {
    console.log(this.form.value);
  }
  onBackClick() {
    this.router.navigate(['flights']);
  }
}
