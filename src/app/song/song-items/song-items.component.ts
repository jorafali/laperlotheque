import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-song-items]',
  templateUrl: './song-items.component.html',
  styleUrls: ['./song-items.component.css']
})
export class SongItemsComponent implements OnInit {

	@Input('song-items-data') songs: Array<any>

  constructor(){}

  ngOnInit() {
  }

}
