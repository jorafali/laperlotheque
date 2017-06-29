import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerService } from './player.service';
import { PlaylistControlService } from './playlist-control.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
  	PlayerService,
  	PlaylistControlService
  ]
})
export class SoundplayerModule { }
