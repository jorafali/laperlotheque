import { Component } from '@angular/core';
import { PlayerService } from './lib/soundplayer/player.service';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: '[app-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public title = 'LAPERLOTHEQUE';
	public songPlaying: Observable<any>;
	constructor(private playerService: PlayerService) {
		this.songPlaying = this.playerService.observables.songPlaying;
	}
}
