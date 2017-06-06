import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PopupModule } from '../../assets/lib/popup/popup.module';

import { SongService, SongResolveService } from './song.service';
import { MetricsService } from './metrics.service';
import { EditSongControlService, EditSongIdParamResolveService } from './upload-song/edit-song-control.service';

import { UploadSongComponent } from './upload-song/upload-song.component';
import { SongTileComponent } from './song-tile/song-tile.component';
import { UploadAudioFileComponent } from './upload-song/upload-audio-file/upload-audio-file.component';
import { EditSongComponent } from './upload-song/edit-song/edit-song.component';
import { UploadThumbnailFileComponent } from './upload-song/upload-thumbnail-file/upload-thumbnail-file.component';
import { SongHighlightComponent } from './song-highlight/song-highlight.component';

const songRoutes: Routes = [
  // {
  //   path: '',
  //   component: SongListComponent
  // },
  // {
  //   path: ':id', 
  //   component: SongHighlightComponent,
  //   resolve: {
  //     song: SongResolveService
  //   },
  //   outlet: 'p'
  // },
  // {
  //   path: 'upload',
  //   component: UploadSongComponent,
  //   outlet: 'p',
  //   children: [
  //     {
  //       path: 'new',
  //       component: UploadAudioFileComponent
  //     },
  //     {
  //       path: 'edit',
  //       component: EditSongComponent,
  //       resolve: {song: EditSongIdParamResolveService},
  //       runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  //     }
  //   ]
  // }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(songRoutes),
    PopupModule
  ],
  declarations: [
    UploadSongComponent,
    SongTileComponent,
    UploadAudioFileComponent,
    EditSongComponent,
    UploadThumbnailFileComponent,
    SongHighlightComponent],
  exports: [
    UploadSongComponent,
    SongTileComponent,
    UploadAudioFileComponent,
    EditSongComponent,
    UploadThumbnailFileComponent,
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