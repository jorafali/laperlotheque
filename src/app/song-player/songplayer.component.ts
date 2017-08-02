import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { PlayerService } from '../lib/soundplayer/player.service';
import { PlaylistControlService } from '../lib/soundplayer/playlist-control.service';
import { Song } from '../song/song';
import { PlaylistSong } from '../lib/soundplayer/player';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: '[app-songplayer]',
	templateUrl: './songplayer.component.html',
	styleUrls: ['./songplayer.component.css']
})
export class SongplayerComponent implements OnInit {

	@Input('app-songplayer') songPlaying: any;
	public playlist: Observable<Array<PlaylistSong>>;

	@HostBinding('class.hidePlaylist') private _hidePlaylist = false;

  // THIS CONSTRUCTOR registers observers on the playlist-control published streams
  /*
  By observing to the playlist-control service streams, this player doesn't care where the instructions are coming from
  It just acts upon receiving streamed events
  */
	constructor(
		private playlistControlService: PlaylistControlService) {
	}

	togglePlaylistDisplay = () => {
		this._hidePlaylist = !this._hidePlaylist;
	}

	play = (song: Song) => {
    // if the song is not already in playlist then adds it to playlist
		if (typeof song.id === 'undefined') {
			console.log('the song is undefined');
			return;
		}
		this.playlistControlService.playSongNow(song as PlaylistSong);
	}

	pause = () => {
		this.playlistControlService.pause();
	}

	next = () => {
		this.playlistControlService.playNextInPlaylist();
	}

	previous = () => {
		this.playlistControlService.playPreviousInPlaylist();
	}

	togglePause = () => {
		this.playlistControlService.togglePause();
	}

	adjustVolume = (value) => {
		console.log(value);
		this.playlistControlService.setVolume(value);
	}

	toggleMute = () => {
		this.playlistControlService.toggleMute();
	}

	addSongToPlaylist = (song: Song) => {
		this.playlistControlService.addSongToPlaylist(song as PlaylistSong);
	}

	jumpToPosition = (decimal) => {
		this.playlistControlService.jumpToPosition(decimal);
	}

	removeSongFromPlaylist = () => {};

	private ErrorEventHandler = (error) => {console.log('an error occured :', error)}

	ngOnInit() {
		// Subscribes to observable streams
		this.playlist = this.playlistControlService.observables.playlist;
		// this.playlistControlService.observables.playlist
		// .subscribe(
		// 	(playlist: Array<PlaylistSong>) => {
		// 		this.playlist = playlist;
		// 	},
		// 	this.ErrorEventHandler,
		// 	() => {}
		// );

		// this.playlistControlService.observables.songPlaying
		// .subscribe(
		// 	songPlaying => {
		// 		this.songPlaying = songPlaying;
		// 	},
		// 	this.ErrorEventHandler,
		// 	() => {}
		// );
	}

}
