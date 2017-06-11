import { Component, OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { MapDataService } from '../../lib/map/map-data.service';

@Component({
  selector: '[app-add-item]',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnChanges {

  @Input('app-add-item') mouseCoordinates;
  public get datum(){
  	return this.mapDataService.layoutData([{id:0, coordinates:this.mouseCoordinates}])[0]
  }

  constructor(private mapDataService: MapDataService) {
  }

  ngOnInit() {
  }

  ngOnChanges(){
  }

}
