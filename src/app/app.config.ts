import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {provide: LOCALE_ID, useValue: 'fr' },
    importProvidersFrom(MatNativeDateModule),
    /*{
    provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['DD', 'MM', 'YYYY'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    }*/
  ]
};
