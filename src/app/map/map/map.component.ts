import { Component, OnInit } from '@angular/core';
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

	public songs: Observable<Array<any>>;
  public layoutType: string;
  public shapeType: string = 'CIRCLE';

  // used by pipes to find x and y coordinates of songs
  readonly xAccessor: any= function(d){return d.coordinates[0]};
  readonly yAccessor: any= function(d){return d.coordinates[1]};

  constructor(private songService: SongService, private mapDataService: MapDataService) {
    this.mapDataService.initLayout({type: 'HEX', xAccessor: this.xAccessor, yAccessor: this.yAccessor})
    this.songs = this.mapDataService.observables.data;
  }

  ngOnInit() {
    this.songService.getSongs()
      .subscribe(
        (songs) => {this.mapDataService.subjects.data.next(songs)}
      )
  }

}
