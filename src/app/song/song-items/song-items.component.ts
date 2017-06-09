import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export enum ClipPathTypeEnum {
	RECTANGLE
}

@Component({
  selector: '[app-song-items]',
  templateUrl: './song-items.component.html',
  styleUrls: ['./song-items.component.css']
})
export class SongItemsComponent implements OnInit {

	@Input('song-items-data') songs: Observable<Array<any>>
	public clipPathType: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  	this.route.queryParams.subscribe(
  		(f)=>{
  			console.log(f)
  			this.clipPathType = +f.shape
  		}
  	)
  }

}
