import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { AddItemComponent } from './add-item/add-item.component';
 
import { SongService } from '../song/song.service';

// LIBS
import { D3MapModule } from '../lib/map/map.module';
import { SongModule } from '../song/song.module';


const mapRoutes: Routes = [
  {
    path: '', redirectTo: 'hex', pathMatch: 'full'
  },
  {
    path: 'hex',
    component: MapComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    D3MapModule,
    SongModule,
    RouterModule.forChild(mapRoutes)
  ],
  exports: [
  	MapComponent,
    AddItemComponent
  ],
  declarations: [
    MapComponent,
    AddItemComponent
  ],
  providers: [
    SongService
  ]
})
export class MapModule { }
