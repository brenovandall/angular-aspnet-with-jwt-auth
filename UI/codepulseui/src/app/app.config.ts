import { ApplicationConfig } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { routes } from './routes';
import { HttpClient, HttpClientModule, HttpHandler, provideHttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), HttpClientModule, Router]
};
