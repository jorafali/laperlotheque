import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundplayerComponent } from './soundplayer.component';
import { SongProgressBarComponent } from './song-progress-bar/song-progress-bar.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SoundplayerComponent,
    SongProgressBarComponent,
    PlaylistComponent
  ],
  declarations: [
    SoundplayerComponent,
    SongProgressBarComponent,
    PlaylistComponent
  ]
})
export class SongPlayerModule { }
