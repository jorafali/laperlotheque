import { Component, OnInit, Input } from '@angular/core';
import { MapDataService } from '../../lib/map/map-data.service';

@Component({
  selector: '[song-items-bla]',
  templateUrl: './circle-item.component.html',
  styleUrls: ['./circle-item.component.css']
})
export class CircleItemComponent implements OnInit {

	data: any;
  constructor(private mapDataService: MapDataService) { }

  ngOnInit() {
  	this.data = this.mapDataService.observables.data
  }

}
