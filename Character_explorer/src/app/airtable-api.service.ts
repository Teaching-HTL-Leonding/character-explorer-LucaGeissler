import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AIRTABLE_URL } from './app.module';
import { Root2 } from './mmo-api.service';

export interface Root {
  records: Record[];
}

export interface Record {
  id: string;
  createdTime: string;
  fields: Fields;
}

export interface Fields {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  publisher: string;
  developer: string;
  release_date: string;
}


@Injectable({
  providedIn: 'root'
})
export class AirtableApiService {

  constructor(private http: HttpClient, @Inject (AIRTABLE_URL) private api_url:string) {}

  public pushFavourite(mmo: Root2){
    const body = {
      records: [
        {
          fields: {
            id: mmo.id,
            title: mmo.title,
            thumbnail: mmo.thumbnail,
            short_description: mmo.short_description,
            publisher: mmo.publisher,
            developer: mmo.developer,
            release_date: mmo.release_date,
          }
        }
      ]
    }
    return this.http.post(this.api_url, body);
  }

  public getFavourites(){
    return this.http.get<Root>(this.api_url)
    ;
  }

  public deleteFavourite(id: string){
    return this.http.delete(this.api_url + '/' + id);
  }
}
