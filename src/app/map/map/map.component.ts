import { Component, OnInit } from '@angular/core';
import { Song } from '../../song/song';
import { SongService } from '../../song/song.service';
import { Observable } from 'rxjs/Observable';

import { MapDataService } from '../../../assets/lib/map/map-data.service';
import { D3HexbinPipe } from '../../../assets/lib/map/layout/d3-hexbin.pipe'

@Component({
  selector: '[app-map]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	public songs: Observable<Array<any>>;
  private layoutDataTransform: any;

  constructor(private songService: SongService, private mapDataService: MapDataService) {
    this.songs = this.mapDataService.observables.data;
  }

  ngOnInit() {
    this.layoutDataTransform = new D3HexbinPipe();
  	// get songs to be displayed on the map. need to implement lazy loading.
  	this.songService.getSongs()
      .map(songs => {
        let xAccessor = function(d){return d.coordinates[0]};
        let yAccessor = function(d){return d.coordinates[1]};
        return this.layoutDataTransform.transform(songs, xAccessor, yAccessor);
      })
      .subscribe(
        data => {
          // console.log(data);
          this.mapDataService.subjects.data.next(data);
        }
      )
  }

}
