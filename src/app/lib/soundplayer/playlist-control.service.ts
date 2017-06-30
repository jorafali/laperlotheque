import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/empty';

import { PlaylistControl, Track } from './player'

import { PlayerService } from './player.service';

// this class is the the central control service for managing sounds
/*
this service is the single point of contact to control a playlist
Typically : 
- This service will be used from anywhere in the app to stream events via observables
- While On the other end, a service/component/directive will observe the streamed observables 
  and decide what to do.

 In theory, with a mix of providing and aliasing this service, it is possible to manage 
 multiple 'playlists/players' within a single application.
 NOTE: for now the service is provided by the module and is part of services provided at root module level
*/
@Injectable()
export class PlaylistControlService implements PlaylistControl {

	public playlist: Array<Track>;
	public songPlaying: any;

	// observable song subjects
	private addSongToPlaylistSubject: BehaviorSubject<Array<Track>> = new BehaviorSubject<Array<Track>>(null);
	private songPlayingSubject: Subject<Track> = new Subject<Track>();
	// private playPreviousSongSubject: Subject<Boolean> = new Subject<Boolean>();
	// private playNextSongSubject: Subject<Boolean> = new Subject<Boolean>();
	// private togglePauseSongSubject: Subject<void> = new Subject<void>();

	// observable song streams
	public observables = {
		playlist: this.addSongToPlaylistSubject.asObservable(),
		songPlaying: this.songPlayingSubject.asObservable()
	}

	constructor(private playerService: PlayerService ) {
		// default values for class properties
  		this.playlist = [];
  		this.songPlaying = this.playerService.songPlaying;

  		// registers observers on the player's event stream : playing a song
  		this.playerService.observables.songPlaying
  			.subscribe(
	  			songPlaying => {
	  				// when the song details are updated, streams it to whoever is observing
	  				this.songPlayingSubject.next(songPlaying);
	  			},
	  			error => {console.log('error observing playerService.songPlaying')},
	  			() => {}
  			)
  	}

	// service method to stream songs
	addSongToPlaylist = (song: Track) => {
		console.log('adding song to playlist :', song);
		const isSongInPlaylist = this.playlist.find((element: Track) => {return element.id === song.id; });
	    if (!isSongInPlaylist) {
			this.playlist.push(song);
			this.addSongToPlaylistSubject.next(this.playlist);
			console.log('playlist now is :', this.playlist);
	    } else {console.log('already in playlist'); };
	};

	removeSongFromPlaylist = (song: Track) => {
		console.log('placeholder to remove song in this playlist: ', song);
	};

	playSongNow = (song: Track)=> {
		if (!song.id) {
			return
		}
		this.addSongToPlaylist(song);
		this.playerService.play(song);
	};

	pause = () => {
		this.playerService.pause();
	}

	jumpToPosition = (decimal: number) => {
		this.playerService.jumpToPosition(decimal);
	}

	togglePause = () => {
		this.playerService.togglePause();
	};

	playNextInPlaylist = () => {
		console.log('placeholder to play next song in the playlist')
	};

	playPreviousInPlaylist = () => {
		console.log('placeholder to play previous song in the playlist')
	};

	toggleAutoNext = () => {
		console.log('placeholder to toggle autoNext song in the playlist');
	};

	toggleRepeat = () => {
		console.log('placeholder to toggle current song in the playlist');
	};

	setVolume = (value: number) => {
		this.playerService.setVolume(value);
	};

	toggleMute = () => {
		this.playerService.toggleMute();
	}
}
