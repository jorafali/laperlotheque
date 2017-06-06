import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomDirective } from './zoom.directive';
import { XAxisDirective } from './x-axis.directive';
import { YAxisDirective } from './y-axis.directive';

import { D3HexbinPipe } from './d3-hexbin.pipe';

import { MapDataService } from './map-data.service' ;

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  	ZoomDirective,
  	XAxisDirective,
  	YAxisDirective,
    D3HexbinPipe
  ],
  declarations: [
    ZoomDirective,
    XAxisDirective,
    YAxisDirective,
    D3HexbinPipe
  ],
  providers: [MapDataService]
})
export class D3MapModule { }