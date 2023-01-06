import { Injectable,Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_PAT } from './app.module';

@Injectable()
export class RapidKeyInterceptor implements HttpInterceptor {

  constructor(@Inject(API_PAT) private api_pat:string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('https://mmo-games.p.rapidapi.com/games')) {
      const authrequest = request.clone({
        setHeaders: {
          'X-Rapidapi-Key':
            this.api_pat,
        },
        setParams: {
          platform: 'pc',
          category: 'mmorpg',
        },
      });
      return next.handle(authrequest);
    }
        if (request.url.startsWith('https://mmo-games.p.rapidapi.com/game')) {
          const authrequest = request.clone({
            setHeaders: {
              'X-Rapidapi-Key':
                this.api_pat,
              'X-Rapidapi-Host': 'mmo-games.p.rapidapi.com',
            },
          });
          return next.handle(authrequest);
        }

    return next.handle(request);
  }
}
