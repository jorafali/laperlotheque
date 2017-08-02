import { Injectable } from '@angular/core';
import { Player, Track } from './player';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var soundManager: any;

// this class purpose is to handle the playing of a SINGLE song
@Injectable()
export class PlayerService implements Player {

	private _songPlaying: any;
	private _muted: boolean;
	// observable soundObject subject
	private _songPlayingSubject: BehaviorSubject<any>;

	readonly defaultSoundObject = {position: 0, duration: 1, paused: true, muted: false};
	readonly defaultHumanReadable = {position: '0:00', duration: '0:00'};

	// observable soundObject stream
	public observables: {
		songPlaying
	};

	constructor() {
		soundManager.setup({
			url: 'https://cdnjs.cloudflare.com/ajax/libs/soundmanager2/2.97a.20150601/swf/soundmanager2.swf'
		});

		this._muted = false;

		this._songPlaying = {
			soundObject: this.defaultSoundObject,
			humanReadable: this.defaultHumanReadable
		};
		this._songPlayingSubject = new BehaviorSubject<any>(this._songPlaying);
		this.observables = {
			songPlaying: this._songPlayingSubject.asObservable()
		};
	};

	// this method plays a song
	play = (song: Track) => {
		// retrieve or creates the soundObject
		try {
			this.initSong(song);
			// then plays the soundObject
			this._songPlaying.soundObject.play();
		} catch (e) {
			if (e instanceof TypeError) {
				console.log('not a valid song to playerService.play');
				throw e;
			} else {
				throw e;
			}
		}
	}

	// this method pauses a song
	pause = () => {
		if (this._songPlaying.soundObject) {
			this._songPlaying.soundObject.pause();
		}
	}

	togglePause = () => {
		if (this._songPlaying.soundObject){
			this._songPlaying.soundObject.togglePause();
		}
	}

	// this method stops the current song
	stop = () => {
		// if a song is already loaded, stops playing it
		if (this._songPlaying.soundObject) {
			this._songPlaying.soundObject.stop();
			console.log('player stopped the current song');
		}
	}

	toggleMute = () => {
		if (this._muted) {
			soundManager.unmute();
		} else {
			soundManager.mute();
		}
		this._muted = !this._muted;
	}

	setVolume = (value: number) => {
		if (this._songPlaying.soundObject) {
			if (value < 0) {
				value = 0;
			} else if (value > 100) {
				value = 100;
			};
			this._songPlaying.soundObject.setVolume(value);
		} else {
			soundManager.setVolume(value);
		}
	}

	jumpToPosition = (decimal: number) => {
		if (this._songPlaying.soundObject) {
			console.log('changing position');
			const position = Math.round(this._songPlaying.soundObject.duration * decimal);
			console.log(position);
			soundManager.setPosition(this._songPlaying.soundObject.id, position);
		}
	}

	private initSong = (song: Track): any => {
		if (!song.id) {
			console.log('not a valid song');
			throw new TypeError('not a valid song, the song must have an id property');
		} else if (!song.trackUrl){
			console.log('not a valid song');
			throw new TypeError('not a valid song, the song must have a trackUrl property');
		}
		// pause currently playing song
		soundManager.pauseAll();
		// try to fetch requested song if it is already loaded
		let soundObject = soundManager.getSoundById(song.id);
		// creates a new soundObject to be handled by SoundManager2
		// if the sound is not already loaded then creates it
		if (!soundObject) {
			console.log('creating soundObject');

			const songUrl = song.trackUrl;
			soundObject = soundManager.createSound({
				id: song.id,
				url: songUrl,
				stream: true,
				onload: (flag) => {
					if (!flag) {
						alert('sound cannot load');
						soundManager.destroySound(song.id);
					}
				},
				whileplaying: () => {
					this._songPlaying.humanReadable.duration = this.millisecondsToHumanReadable(this._songPlaying.soundObject.duration);
					this._songPlaying.humanReadable.position = this.millisecondsToHumanReadable(this._songPlaying.soundObject.position);
					this._songPlayingSubject.next(this._songPlaying);
				}
			});
			// set current songPlaying
			this._songPlaying = song;
			// add created soundObject and default human readable progress markers to input song
			this._songPlaying.soundObject = soundObject;
			this._songPlaying.humanReadable = this.defaultHumanReadable;
		} else {
			// the song has already been created, just assigns current _songPlaying back to it
			this._songPlaying = song;
		}
	}

	private millisecondsToHumanReadable = (millisec: number) => {
		let humanReadable: string;
		const hr: number = Math.floor((((millisec / 1000) % 31536000) % 86400) / 3600);
		const min: number = Math.floor(((((millisec / 1000) % 31536000) % 86400) % 3600) / 60);
		const sec: number = Math.round(((((millisec / 1000) % 31536000) % 86400) % 3600) % 60);

		humanReadable = min + ':' + ((sec < 10) ? '0' + sec : sec).toString();
		return humanReadable;
	}

}
