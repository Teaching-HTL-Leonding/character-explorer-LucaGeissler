import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_ALL } from './app.module';
import { API_URL_ONE } from './app.module';

export type Games = Root2[];

export interface Root2 {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  profile_url: string;
  favourite: boolean;
  description: string;
}


@Injectable({
  providedIn: 'root'
})
export class MmoApiService {

  constructor(private http: HttpClient, @Inject(API_URL_ALL) private api_url_all: string, @Inject(API_URL_ONE) private api_url_one:string) { }

  public getMmos(): Observable<Games> {
    return this.http.get<Games>(this.api_url_all);
  }

  public getMmo(id: number): Observable<Root2> {
    return this.http.get<Root2>(this.api_url_one + '?id=' + id);
  }
}
