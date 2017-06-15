import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClipPathTypeEnum } from '../../lib/map/map.module';


@Component({
  selector: '[app-song-items]',
  templateUrl: './song-items.component.html',
  styleUrls: ['./song-items.component.css']
})
export class SongItemsComponent implements OnInit {

	@Input('song-items-data') songs: Observable<Array<any>>
	private clipPathType: any;

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
