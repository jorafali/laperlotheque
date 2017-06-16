import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundplayerComponent } from './soundplayer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  	SoundplayerComponent
  ],
  declarations: [
  	SoundplayerComponent
  ]
})
export class SongPlayerModule { }
