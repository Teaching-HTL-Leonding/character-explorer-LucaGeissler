import { Inject, InjectionToken, NgModule, NgProbeToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { RapidKeyInterceptor } from './rapid-key.interceptor';
import { AirtableAuthInterceptor } from './airtable-pat.interceptor';
import { SearchFilterPipe } from './search-filter.pipe';
import { DetailScreenComponent } from './detail-screen/detail-screen.component';
import { HeroesScreenComponent } from './heroes-screen/heroes-screen.component';
import { AppComponent } from './app.component';

import { environment } from './environments/environment';

export const API_URL_ALL = new InjectionToken<string>('BaseUrl');
export const API_URL_ONE = new InjectionToken<string>('BaseUrl');
export const API_PAT = new InjectionToken<string>('BasePat');
export const AIRTABLE_PAT = new InjectionToken<string>('AirtablePat');
export const AIRTABLE_URL = new InjectionToken<string>('AirtableBase');

@NgModule({
  declarations: [SearchFilterPipe, DetailScreenComponent, HeroesScreenComponent, HeroesScreenComponent, DetailScreenComponent,AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: API_URL_ALL,
      useValue: 'https://mmo-games.p.rapidapi.com/games',
    },
    {
      provide: API_URL_ONE,
      useValue: 'https://mmo-games.p.rapidapi.com/game',
    },
    {
      provide: API_PAT,
      useValue: environment.mmo_api_key,
    },
    {
      provide: AIRTABLE_PAT,
      useValue:
        environment.airtable_api_key,
    },
    {
      provide: AIRTABLE_URL,
      useValue: 'https://api.airtable.com/v0/appdhZwgjJovhcXHi/Games',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AirtableAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RapidKeyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
