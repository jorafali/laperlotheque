import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
// player types
import { PlaylistSong } from '../../lib/soundplayer/player';

import { PlaylistControlService } from '../../lib/soundplayer/playlist-control.service';
import { SongService } from '../../song/song.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
	selector: '[app-playlist]',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.css'],
	// changeDetection could be changed to onPush
})
export class PlaylistComponent implements OnInit {

	@Input('app-playlist') songs: Array<PlaylistSong>;
	public songPlayingId: Observable<number>;

	constructor(
		private playlistControlService: PlaylistControlService,
		// 		private songService: SongService,
		// 		private router: Router,
		// 		private route: ActivatedRoute
			) { }

	ngOnInit() {
		// gets song playing from playlist control
		this.songPlayingId = this.playlistControlService.observables.songPlaying
			.map((songPlaying) => {
				return songPlaying.id;
			})
			.distinctUntilChanged();

		// gets playlist songs from song playlist control
		// this.songs = this.playlistControlService.observables.playlist
		// .filter((songs) => {
		// 	return songs ? true : false;
		// })
		// .do(
		// 	(songs) => {
		// 	const ids = songs.map((s, idx, arr) => {return s.id; });
		// 	const navExtras: NavigationExtras = {
		// 		queryParams: {p: ids},
		// 		queryParamsHandling: 'merge'
		// 	};
		// 	this._songs = songs;
		// 	this.router.navigate([], navExtras);
		// 	}
		// );

		// watches params for p (for playlist) members. params.p is an array of song ids
		// this.route.queryParams
		// // skips the first streamed value as it is the initial load for the app and at that time the params are still empty
		// .skip(1)
		// /**
		//  * filters streamed params:
		//  * + if there are no ids in params.p then don't bother
		//  * + if there are no songs in the current playlist then continues
		//  * + if there are different numbers of songs in params.p and songs then continues
		//  * + if params.p is populated with different ids than songs then continues
		//  */
		// .filter((params) => {
		// 	if (
		// 		(!params || !params.p) || (+params.p.length <= 0)
		// 	) {return false; }

		// 	if (
		// 		(!this.songs) || (params.length !== this._songs.length)
		// 	) {return true; };

		// 	if (params.p) {
		// 		params.p.forEach(element => {
		// 		const isFound = this._songs.find((el) => {
		// 			return el.id === element.id;
		// 		});
		// 		if (!isFound) {
		// 			return true;
		// 		}
		// 		});
		// 	}
		// 	// DEFAULT if not returned already then return false
		// 	return false;
		// })
		// .flatMap((params) => {
		// 	console.log('params :', params);
		// 	return this.songService.getSongsById(params.p);
		// })
		// .subscribe((songs) => {
		// 	console.log('songs from params :', songs);
		// 	// pushes songs to playlist
		// 	songs.forEach(element => {
		// 		this.playlistControlService.addSongToPlaylist(element);
		// 	});
		// });
	}

}
