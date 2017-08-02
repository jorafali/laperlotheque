import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongplayerComponent } from './songplayer.component';
import { SongProgressBarComponent } from './song-progress-bar/song-progress-bar.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AuthenticationModule } from '../lib/authentication/authentication.module';
import { PlaylistItemComponent } from './playlist/playlist-item/playlist-item.component';

@NgModule({
	imports: [
		CommonModule,
		AuthenticationModule
	],
	exports: [
		SongplayerComponent,
		SongProgressBarComponent,
		PlaylistComponent,
		PlaylistItemComponent
	],
	declarations: [
		SongplayerComponent,
		SongProgressBarComponent,
		PlaylistComponent,
		PlaylistItemComponent
	]
})
export class SongPlayerModule { }
