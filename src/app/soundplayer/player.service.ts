import { Injectable } from '@angular/core';
import { Player, Track } from './player';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var soundManager: any;

// this class purpose is to handle the playing of a SINGLE song
@Injectable()
export class PlayerService implements Player {

	public songPlaying: any;
	readonly defaultSoundObject = {position: 0, duration:1, paused: true, muted: false} ; 
	readonly defaultHumanReadable = {position: '0:00', duration: '0:00'} ;

	private muted: boolean = false;
	// observable soundObject subject
	private songPlayingSubject: Subject<any> = new Subject<any>();

	// observable soundObject stream
	public observables = {
		songPlaying: this.songPlayingSubject.asObservable()
	}

	constructor() { 

		soundManager.setup({
			url: 'https://cdnjs.cloudflare.com/ajax/libs/soundmanager2/2.97a.20150601/swf/soundmanager2.swf'
		});

		this.songPlaying = {
			soundObject: this.defaultSoundObject,
			humanReadable: this.defaultHumanReadable
		};
	};

	// this method plays a song
	play = (song: Track)=>{
		// retrieve or creates the soundObject
		try {
			this.initSong(song);
			// then plays the soundObject
			this.songPlaying.soundObject.play();
		} catch (e) {
			if (e instanceof TypeError) {
				console.log('not a valid song to playerService.play')
				throw e;
			} else {
				throw e;
				
			}
		}
	};

	// this method pauses a song
	pause = () => {
		if (this.songPlaying.soundObject){
			this.songPlaying.soundObject.pause();
		}
	};

	togglePause = () => {
		if (this.songPlaying.soundObject){
			this.songPlaying.soundObject.togglePause();
		}
	};

	toggleMute = () => {
		if(this.muted){
			soundManager.unmute();
		} else {
			soundManager.mute();
		}
		this.muted = !this.muted
	};

	setVolume = (value: number) => {
		if (this.songPlaying.soundObject){
			if (value<0) {value==0}
			else if (value>100) {value==100};
			this.songPlaying.soundObject.setVolume(value);
		} else {
			soundManager.setVolume(value);
		}
	}

	jumpToPosition = (decimal: number) => {
		if (this.songPlaying.soundObject){
			console.log('changing position');
			let position = Math.round(this.songPlaying.soundObject.duration*decimal);
			console.log(position);
			soundManager.setPosition(this.songPlaying.soundObject.id, position);
		}
	};

	private initSong = (song: Track) => {
		if (!song.id){
			console.log('not a valid song');
			throw new TypeError('not a valid song, the song must have an id property');
		} else if (!song.trackUrl){
			console.log('not a valid song');
			throw new TypeError('not a valid song, the song must have a trackUrl property');
		}
		//pause currently playing song
		soundManager.pauseAll();
		// try to fetch requested song if it is already loaded
		let soundObject = soundManager.getSoundById(song.id);
		// creates a new soundObject to be handled by SoundManager2
		// if the sound is not already loaded then creates it
		if (!soundObject) {
			console.log('creating soundObject');

			var songUrl = song.trackUrl;
			soundObject = soundManager.createSound({
				id:song.id,
				url: songUrl,
				stream: true,
				onload: (flag)=>{
					if (!flag){
						console.log('cannot load');
						soundManager.destroySound(song.id);
					}
				},
				whileplaying: () => {
					this.songPlaying.humanReadable.duration = this.millisecondsToHumanReadable(this.songPlaying.soundObject.duration);
					this.songPlaying.humanReadable.position = this.millisecondsToHumanReadable(this.songPlaying.soundObject.position);
					this.songPlayingSubject.next(this.songPlaying);
				}
			})
		}
		// set current songPlaying

		this.songPlaying = song;
		this.songPlaying.soundObject = soundObject;
		this.songPlaying.humanReadable = this.defaultHumanReadable;
	};

	// this method stops the current song
	private stop = ()=> {
		// if a song is already loaded, stops playing it
		if (this.songPlaying.soundObject) {
			this.songPlaying.soundObject.stop();
			console.log('player stopped the current song');
		}
	};

	private millisecondsToHumanReadable = (millisec: number) => {
	    let humanReadable: string;
	    let hr: number = Math.floor((((millisec/1000) % 31536000) % 86400) / 3600);
	    let min: number = Math.floor(((((millisec/1000) % 31536000) % 86400) % 3600) / 60);
	    let sec: number = Math.round(((((millisec/1000) % 31536000) % 86400) % 3600) % 60);

	    humanReadable = min+':'+((sec<10)? '0'+sec:sec).toString();
	    return humanReadable
	  }

}
