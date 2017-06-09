import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInputModule } from '../user-input/user-input.module';

import { PlayerService } from './player.service';
import { PlaylistControlService } from './playlist-control.service';
// components
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';

@NgModule({
  imports: [
    CommonModule,
    UserInputModule
  ],
  declarations: [
  	VolumeSliderComponent
  ],
  exports: [
    VolumeSliderComponent
  ],
  providers: [
  	PlayerService,
  	PlaylistControlService
  ]
})
export class SoundplayerModule { }
