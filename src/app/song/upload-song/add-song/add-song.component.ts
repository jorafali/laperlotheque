import { Component, OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { MapDataService } from '../../../lib/map/map-data.service';
import { ClipPathTypeEnum } from '../../../lib/map/map.module';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: '[app-add-song]',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit, OnChanges {

  @Input('app-add-song') mouseCoordinates;
  public get datum(){
  	return this.mapDataService.layoutData([{id:0, coordinates:this.mouseCoordinates}])[0]
  }

  private clipPathType: any= 1;

  constructor(private mapDataService: MapDataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (p)=>{
        this.clipPathType = ClipPathTypeEnum[+p.shape] || ClipPathTypeEnum[1]
      }
    )
  }

  ngOnChanges(){
  }

}
