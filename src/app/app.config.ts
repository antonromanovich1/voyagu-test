import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { VoyaguTest } from './utils/voyagu-theme.presets';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CustomRouteReuseStrategy } from './utils/route-reuse-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: VoyaguTest,
      },
    }),
    // TODO: check if needed to restore search page state and how often it should be updated
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    // to use in DI
    DatePipe,
    CurrencyPipe,
  ],
};
