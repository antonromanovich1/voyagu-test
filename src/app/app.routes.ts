import { Routes } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { BookFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
  {
    path: 'flights',
    component: FlightsComponent,
  },
  {
    path: 'booking',
    component: BookFormComponent,
  },
  {
    path: '',
    redirectTo: '/flights',
    pathMatch: 'full',
  },
];
