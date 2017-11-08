import { Component, OnInit, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { Song } from '../../song/song';
import { Observable } from 'rxjs/Observable';

import { MapDataService } from '../../lib/map/map-data.service';
import { SongService} from '../../song/song.service';

@Component({
	selector: '[app-map]',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
	// ,
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

	public songs = this.mapDataService.observables.newData;
  	// public layoutType: string;
	@Input('is-admin') isAdmin: boolean;
	// used for data convertion on layout to find x and y coordinates of songs
	readonly xAccessor: any= (d) => { return d.coordinates[0]; };
	readonly yAccessor: any= (d) => { return d.coordinates[1]; };

	constructor(
		private songService: SongService,
		private mapDataService: MapDataService) {

		// at this point the map component is responsible for letting the mapDataService know what the data looks like
		// so that the correct layout can bi initialised
		this.mapDataService.initLayout({type: 'HEX', xAccessor: this.xAccessor, yAccessor: this.yAccessor});
	}

	ngOnInit() {
		this.songService.getSongs()
			.subscribe(
				(songs) => {
					// on map init, pushes in the initial data load into mapDataService
					this.mapDataService.subjects.data.next(songs);
				}
			);
	}
}
