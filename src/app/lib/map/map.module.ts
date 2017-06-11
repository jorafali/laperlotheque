import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';

import { ZoomDirective } from './zoom.directive';
import { XAxisDirective } from './x-axis.directive';
import { YAxisDirective } from './y-axis.directive';

import { MapDataService } from './map-data.service' ;
import { D3HexbinService } from './layout/d3-hexbin.service';
import { CircleComponent } from './shape/circle/circle.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
  	ZoomDirective,
  	XAxisDirective,
  	YAxisDirective,
    CircleComponent,
    AddItemComponent
  ],
  declarations: [
    ZoomDirective,
    XAxisDirective,
    YAxisDirective,
    CircleComponent,
    AddItemComponent
  ],
  providers: [MapDataService, D3HexbinService]
})
export class D3MapModule { }