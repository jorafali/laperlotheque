import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PopupModule } from '../lib/popup/popup.module';
import { SliderAsideModule } from '../lib/slider-aside/slider-aside.module';
import { D3MapModule } from '../lib/map/map.module';

import { SongService, SongResolveService } from './song.service';
import { MetricsService } from './metrics.service';
import { EditSongControlService, EditSongIdParamResolveService } from './upload-song/edit-song-control.service';

import { UploadSongComponent } from './upload-song/upload-song.component';
import { SongTileComponent } from './song-tile/song-tile.component';
import { UploadAudioFileComponent } from './upload-song/upload-audio-file/upload-audio-file.component';
import { EditSongComponent } from './upload-song/edit-song/edit-song.component';
import { UploadThumbnailFileComponent } from './upload-song/upload-thumbnail-file/upload-thumbnail-file.component';
import { SongItemsComponent } from './song-items/song-items.component';
import { AddSongComponent } from './upload-song/add-song/add-song.component';
import { SongItemComponent } from './song-item/song-item.component';
import { SongHighlightComponent } from './song-highlight/song-highlight.component';


const songRoutes: Routes = [
  {
    path: ':id',
    component: SongHighlightComponent,
    resolve: {
      song: SongResolveService
    },
    outlet: 's'
  },
  {
    path: 'edit',
    outlet: 'p',
    component: UploadSongComponent,
    children: [
      {
        path: 'song',
        component: EditSongComponent,
        resolve: {song: EditSongIdParamResolveService},
        // tells to rerun resolvers when params are changed
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(songRoutes),
    PopupModule,
    SliderAsideModule,
    D3MapModule
  ],
  declarations: [
    UploadSongComponent,
    SongTileComponent,
    UploadAudioFileComponent,
    EditSongComponent,
    UploadThumbnailFileComponent,
    SongItemsComponent,
    AddSongComponent,
    SongItemComponent,
    SongHighlightComponent],
  exports: [
    UploadSongComponent,
    SongTileComponent,
    UploadAudioFileComponent,
    EditSongComponent,
    UploadThumbnailFileComponent,
    SongItemsComponent,
    AddSongComponent,
    SongItemComponent,
    SongHighlightComponent],
  providers: [
    SongService,
    SongResolveService,
    EditSongControlService,
    EditSongIdParamResolveService,
    MetricsService
  ]
})
export class SongModule { }
