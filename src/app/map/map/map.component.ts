import { Component, OnInit } from '@angular/core';
import { Song } from '../../song/song';
import { SongService } from '../../song/song.service';

@Component({
  selector: '[app-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	public songs: Array<Song>;

  constructor(private songService: SongService) { }

  ngOnInit() {
  	// get songs to be displayed on the map. need to implement lazy loading.
  	this.songService.getSongs()
  		.subscribe(
  			(songs)=>{
  				this.songs=songs;
  				console.log('got songs :', songs);
  			},
  			(error)=>{
  				console.log('an error occured trying to fetch songs');
  			}
  		)
  }

}
