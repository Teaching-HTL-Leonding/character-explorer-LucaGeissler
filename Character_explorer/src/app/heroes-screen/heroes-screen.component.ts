import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirtableApiService, Root, Record } from '../airtable-api.service';
import { Games, MmoApiService } from '../mmo-api.service';

@Component({
  selector: 'app-heroes-screen',
  templateUrl: './heroes-screen.component.html',
  styleUrls: ['./heroes-screen.component.css'],
})
export class HeroesScreenComponent implements OnInit {
  public mmoList!: Games;
  public favouriteList!: Root;

  public displayedList: any;
  public showFavourite: boolean = false;
  public searchText!: string;

  constructor(
    private mmoApiService: MmoApiService,
    private airtableApiService: AirtableApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mmoApiService.getMmos().subscribe((data) => {
      this.mmoList = data;
      this.displayedList = this.mmoList;
    });
    this.airtableApiService.getFavourites().subscribe((data) => {
      this.favouriteList = data;
      this.favouriteList.records.forEach((favourite: Record) => {
        this.mmoList.forEach((game) => {
          if (favourite.fields.id === game.id) {
            game.favourite = true;
          }
        });
      });
    });
  }

  public setFavourite(mmo: any): void {
    if (!mmo.favourite) {
      mmo.favourite = true;
      this.airtableApiService.pushFavourite(mmo).subscribe();
    }
  }

  public deleteFavourite(id: string, game_id: number): void {
    this.airtableApiService.deleteFavourite(id).subscribe();
    {
      this.airtableApiService.getFavourites().subscribe((data) => {
        this.favouriteList = data;
      });
    }
    this.mmoList.forEach((game) => {
      if (game.id === game_id) {
        game.favourite = false;
      }
    });
  }

  public showFavouriteList() {
    this.airtableApiService.getFavourites().subscribe((data) => {
      this.favouriteList = data;
    });

    this.displayedList = this.favouriteList;
    this.showFavourite = true;
  }

  public showAllGames() {
    this.displayedList = this.mmoList;
    this.showFavourite = false;
  }

  public favouritePage(id: number): void {
    this.router.navigate(['/detail-screen', id]);
  }
}
