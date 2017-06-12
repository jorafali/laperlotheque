import { Component, OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { MapDataService } from '../../../lib/map/map-data.service';
import { ClipPathTypeEnum } from '../../../lib/map/map.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EditSongControlService } from '../edit-song-control.service';
import { Song } from '../../song';

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

  constructor(
    private mapDataService: MapDataService,
    private route: ActivatedRoute,
    private router: Router,
    private editSongControlService: EditSongControlService) {
  }

  public goToUploadSong = ()=>{
    console.log('gotoypload')
    let newSong = Song.emptySong;
    newSong.coordinates = [this.datum.x, this.datum.y]
    this.editSongControlService.initNewSongToEdit(newSong);
    this.router.navigate([{outlets: {p: 'upload/new'}}])
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
