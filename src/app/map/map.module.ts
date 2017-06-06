import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { RouterModule, Routes } from '@angular/router';

import { SongService } from '../song/song.service';

// LIBS
import { D3MapModule } from '../../assets/lib/map/map.module';
import { LayoutHexagonalGridComponent } from './layout-hexagonal-grid/layout-hexagonal-grid.component';

const mapRoutes: Routes = [
  {
    path: '',
    component: LayoutHexagonalGridComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    D3MapModule,
    RouterModule.forChild(mapRoutes)
  ],
  exports: [
  	MapComponent,
    LayoutHexagonalGridComponent
  ],
  declarations: [
    MapComponent,
    LayoutHexagonalGridComponent
  ],
  providers: [
    SongService
  ]
})
export class MapModule { }
