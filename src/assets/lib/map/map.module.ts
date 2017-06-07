import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';

import { ZoomDirective } from './zoom.directive';
import { XAxisDirective } from './x-axis.directive';
import { YAxisDirective } from './y-axis.directive';

import { MapDataService } from './map-data.service' ;

@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
  	ZoomDirective,
  	XAxisDirective,
  	YAxisDirective
  ],
  declarations: [
    ZoomDirective,
    XAxisDirective,
    YAxisDirective
  ],
  providers: [MapDataService]
})
export class D3MapModule { }