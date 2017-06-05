import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ZoomDirective } from './zoom.directive';
import { XAxisDirective } from './x-axis.directive';
import { YAxisDirective } from './y-axis.directive';

import { SongService } from '../song/song.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  	MapComponent,
  	ZoomDirective,
  	XAxisDirective,
  	YAxisDirective
  ],
  declarations: [
    MapComponent, 
    ZoomDirective, 
    XAxisDirective, 
    YAxisDirective
  ],
  providers: [
    SongService
  ]
})
export class MapModule { }
