import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  host: {
    class: 'flex flex-column align-items-center min-h-screen',
  },
})
export class LayoutComponent {}
