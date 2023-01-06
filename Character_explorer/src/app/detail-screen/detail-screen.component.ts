import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Root2} from '../mmo-api.service';
import { MmoApiService } from '../mmo-api.service';
import { AirtableApiService } from '../airtable-api.service';

@Component({
  selector: 'app-detail-screen',
  templateUrl: './detail-screen.component.html',
  styleUrls: ['./detail-screen.component.css']
})
export class DetailScreenComponent implements OnInit{

  public gameId!: number;
  public game!: Root2;

  constructor(    
    public mmoApiService: MmoApiService,
    public airtableApiService: AirtableApiService,
    public route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.mmoApiService.getMmo(this.gameId).subscribe((data) => {
      this.game = data;
    });
  }

  public addAsFavourite(game: Root2): void {
    this.airtableApiService.pushFavourite(game).subscribe();
  }

}
