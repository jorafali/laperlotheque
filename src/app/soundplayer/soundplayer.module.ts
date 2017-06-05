import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInputModule } from '../user-input/user-input.module';
// services
// NOTE : for now one player for the module
// todo > I want to have the player service instanciated by the playlist-control service so that every playlist
// potentially has its own player
import { PlayerService } from './player.service';
import { PlaylistControlService } from './playlist-control.service';
// components
import { SoundplayerComponent } from './soundplayer.component';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';

@NgModule({
  imports: [
    CommonModule,
    UserInputModule
  ],
  declarations: [
  	SoundplayerComponent,
  	VolumeSliderComponent
  ],
  exports: [
  	SoundplayerComponent,
    VolumeSliderComponent
  ],
  providers: [
  	PlayerService,
  	PlaylistControlService
  ]
})
export class SoundplayerModule { }
