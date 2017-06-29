import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundplayerComponent } from './soundplayer.component';
import { SongProgressBarComponent } from './song-progress-bar/song-progress-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  	SoundplayerComponent,
    SongProgressBarComponent
  ],
  declarations: [
  	SoundplayerComponent,
  	SongProgressBarComponent
  ]
})
export class SongPlayerModule { }
