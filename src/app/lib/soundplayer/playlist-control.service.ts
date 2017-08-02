import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/empty';

import { PlaylistControl, Track, PlaylistSong } from './player';

import { PlayerService } from './player.service';

// this class is the the central control service for managing sounds
/*
this service is the single point of contact to control a playlist
Typically :
- This service will be used from anywhere in the app to stream events via observables
- While On the other end, a service/component/directive will observe the streamed observables 
  and decide what to do.
*/
@Injectable()
export class PlaylistControlService implements PlaylistControl {

	private _playlist: Array<PlaylistSong>;
	private _songPlaying: PlaylistSong;
	// observable song subjects
	private _addSongToPlaylistSubject: BehaviorSubject<Array<PlaylistSong>>;

	// observable song streams
	public observables: {
		playlist,
		songPlaying,
	};

	constructor(private playerService: PlayerService ) {
		this._playlist = [];
		this._addSongToPlaylistSubject = new BehaviorSubject<Array<PlaylistSong>>(this._playlist);

		this.observables = {
			playlist: this._addSongToPlaylistSubject.asObservable(),
			songPlaying: this.playerService.observables.songPlaying
		}
  		// registers observers on the player's event stream : playing a song
		this.observables.songPlaying
			.subscribe(
				songPlaying => {
	  				// when songPlaying is streamed from player, set _songPlaying to new value
					this._songPlaying = songPlaying;
				},
				error => {
					console.log('error observing playerService.songPlaying from playlist control'); 
				},
				() => {}
			);
	}

	// service method to stream songs
	addSongToPlaylist = (song: PlaylistSong) => {
		// console.log('adding song to playlist :', song);
		const isSongInPlaylist = this._playlist.find((element: Track) => {return element.id === song.id; });
		if (!isSongInPlaylist) {
			this._playlist.push(song);
			this._addSongToPlaylistSubject.next(this._playlist);
			// console.log('playlist now is :', this._playlist);
		} else {
			console.log('already in playlist');
		};
	}

	removeSongFromPlaylist = (song: Track) => {
		console.log('placeholder to remove song in this playlist: ', song);
	}

	playSongNow = (song: PlaylistSong) => {
		if (!song.id) {
			return;
		}
		this.addSongToPlaylist(song);
		this.playerService.play(song);
	}

	pause = () => {
		this.playerService.pause();
	}

	jumpToPosition = (decimal: number) => {
		this.playerService.jumpToPosition(decimal);
	}

	togglePause = () => {
		this.playerService.togglePause();
	}

	playNextInPlaylist = () => {
		// console.log('playing next song');
		if ( this._playlist.length === 0 ) {
			console.log('empty playlist');
			return;
		}
		const currentSongIndex = this._playlist.findIndex((song, idx, arr) => {
			return this._songPlaying.id === song.id;
		});
		if ( currentSongIndex >= 0 && currentSongIndex !== this._playlist.length - 1) {
			this.playSongNow(this._playlist[currentSongIndex + 1] );
		} else {
			console.log('no song to play next in playlist');
		}
	}

	playPreviousInPlaylist = () => {
		// console.log('playing previous song in playlist :', this._playlist);
		if ( this._playlist.length === 0 ) {
			console.log('empty playlist');
			return;
		}
		const currentSongIndex = this._playlist.findIndex((song, idx, arr) => {
			return this._songPlaying.id === song.id;
		});
		// console.log('current index', currentSongIndex);
		if ( currentSongIndex > 0 ) {
			this.playSongNow( this._playlist[currentSongIndex - 1] );
		} else {
			console.log('no previous song to play in playlist');
		}
	}

	toggleAutoNext = () => {
		console.log('placeholder to toggle autoNext song in the playlist');
	}

	toggleRepeat = () => {
		console.log('placeholder to toggle current song in the playlist');
	}

	setVolume = (value: number) => {
		this.playerService.setVolume(value);
	}

	toggleMute = () => {
		this.playerService.toggleMute();
	}
}
