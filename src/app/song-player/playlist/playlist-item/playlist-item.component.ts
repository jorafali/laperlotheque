import { Component, OnInit,
	Input} from '@angular/core';

@Component({
	selector: '[app-playlist-item]',
	templateUrl: './playlist-item.component.html',
	styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnInit {

	@Input('app-playlist-item') song: any;
	@Input('now-playing-id') currentPlayingId: number;
	get isPlaying(){
		return this.currentPlayingId === this.song.id;
	}

	constructor() { }

	ngOnInit() {
		console.log('isPlaying has been set to :', this.isPlaying);

	}

}
