import { Component, OnInit } from '@angular/core';
import { Song } from '../../song/song';
import { SongService } from '../../song/song.service';
import { Observable } from 'rxjs/Observable';

import { MapDataService } from '../../../assets/lib/map/map-data.service';

// for trial purposes for now
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: '[app-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	public songs: Observable<Array<Song>>;

  constructor(private songService: SongService, private mapDataService: MapDataService) {
    this.songs = this.mapDataService.observables.data;
  }

  ngOnInit() {
  	// get songs to be displayed on the map. need to implement lazy loading.
  	this.songService.getSongs()
      .subscribe(
        songs => {
          this.mapDataService.subjects.data.next(songs);
        }
      )
  }

}
