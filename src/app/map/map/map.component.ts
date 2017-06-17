import { Component, OnInit, ElementRef } from '@angular/core';
import { Song } from '../../song/song';
import { Observable } from 'rxjs/Observable';

import { MapDataService } from '../../lib/map/map-data.service';
import { SongService} from '../../song/song.service';

@Component({
  selector: '[app-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	public songs: Array<any>;
  // public layoutType: string;
  public isAdmin = true;

  // used for data convertion on layout to find x and y coordinates of songs
  readonly xAccessor: any= (d)=>{return d.coordinates[0]};
  readonly yAccessor: any= (d)=>{return d.coordinates[1]};

  constructor(
    private songService: SongService,
    private mapDataService: MapDataService) {
    this.mapDataService.initLayout({type: 'HEX', xAccessor: this.xAccessor, yAccessor: this.yAccessor});
    this.songs = this.mapDataService.data;
  }

  ngOnInit() {
    this.mapDataService.observables.newData.subscribe(newData=>{
      console.log('some data has been amended into map data :', newData);
      // need to reload the corresponding components
    });

    this.songService.getSongs()
      .subscribe(
        (songs) => {this.mapDataService.subjects.data.next(songs)}
      )
  }

}
