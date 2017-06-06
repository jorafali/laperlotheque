import { Component, OnInit, ElementRef } from '@angular/core';
import { MapDataService } from '../../../assets/lib/map/map-data.service';
import { Observable } from 'rxjs/Observable';
import { Song } from '../../song/song';

@Component({
  selector: 'svg[app-layout-hexagonal-grid]',
  templateUrl: './layout-hexagonal-grid.component.html',
  styleUrls: ['./layout-hexagonal-grid.component.css']
})
export class LayoutHexagonalGridComponent implements OnInit {

	public songs: Observable<Array<Song>>;

  constructor(private mapDataService: MapDataService, private el: ElementRef) {
  	this.songs = this.mapDataService.observables.data;
  	console.log(this.el);
  }

  ngOnInit() {
  }

}
