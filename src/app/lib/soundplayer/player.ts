import {Observable} from 'rxjs/Observable';

export interface Track {
	id: any;
	trackUrl: string;
}

export interface Player {
	play (song: Track): void;
	pause (): void;
	togglePause (): void;
	toggleMute (): void;
	setVolume (value: number): void;
	jumpToPosition (percent: number): void;
}

export interface PlaylistSong extends Track {
	title: string;
	artist: string;
	thumbnailUrl?: string;
}

export interface PlaylistControl {
	observables: {
		playlist: Observable<Array<Track>>,
		songPlaying: Observable<Track>
	};

	addSongToPlaylist (song: Track): void;
	removeSongFromPlaylist (song: Track): void;
	playSongNow (song: Track): void;
	jumpToPosition(decimal: number): void;
	playNextInPlaylist (): void;
	playPreviousInPlaylist (): void;
	togglePause (): void;
	toggleMute (): void;
	setVolume (value: number): void;
	toggleRepeat? (): void;
	toggleAutoNext? (): void;
}

// tslint:disable-next-line:no-empty-interface
export interface SoundObject {}
