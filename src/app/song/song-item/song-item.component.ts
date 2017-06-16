import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClipPathTypeEnum } from '../../lib/map/map.module';

@Component({
  selector: '[app-song-item]',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {

	@Input('app-song-item') song: any;
	private clipPathType: string;

	constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

	navigateToEdit = (event: MouseEvent, songId) => {
    console.log(songId)
    event.stopPropagation();
    this.router.navigate([{outlets: {p: ['edit','song']}}], {queryParams: {editSongId: songId}})
    // this.router.navigate(['upload','edit', {outlets: {p: 'edit'}}], {queryParams: {editSongId: this.song.id}})
  };

  ngOnInit() {
  	this.route.queryParams.subscribe(
  		(p)=>{
  			this.clipPathType = ClipPathTypeEnum[+p.shape] || ClipPathTypeEnum[1]
  		}
  	)
  }
}
