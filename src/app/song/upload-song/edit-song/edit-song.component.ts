import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'

import { Subscription } from 'rxjs/Subscription';

import { EditSongControlService} from '../edit-song-control.service';
import { SongService, UpdateableSongFieldsEnum } from '../../song.service';
import { Song } from '../../song';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit, OnDestroy {

  private subs: Array<Subscription>;

	get song(): EditSongControlService {
		return this.editSongControlService;
	};
	set song(val){
		this.editSongControlService = val;
	}

  constructor(
  	private editSongControlService: EditSongControlService,
    private router: Router,
    private route: ActivatedRoute,
    // private songService: SongService
    ) {}

  public updateSongAttributes() {
    let allAttributesUpdate: Array<UpdateableSongFieldsEnum> = [
      UpdateableSongFieldsEnum.title,
      UpdateableSongFieldsEnum.artist,
      UpdateableSongFieldsEnum.description,
      UpdateableSongFieldsEnum.tags
    ]
    this.editSongControlService.updateSongAttributes(allAttributesUpdate).subscribe(
      success=>{
        console.log('updated song, song is now :',success);
      })
  };

  ngOnInit() {
     
    this.subs = [
      // data from queryParam resolve
      this.route.data
        .subscribe((data: {song?: any})=>{
          let song = data.song;
          if (song){
            this.song.id = song.id;
            this.song.userId = song.id;
            this.song.title = song.title;
            this.song.artist = song.artist;
            this.song.description = song.description;
            this.song.tags = song.tags;
            this.song.thumbnailUrl = song.thumbnailUrl;

            console.log('the song to edi is now :', this.song);
          } else {
            this.song.id =null;
            this.song.userId =null;
            this.song.title =null;
            this.song.artist =null;
            this.song.description =null;
            this.song.tags =null;
            this.song.thumbnailUrl = null;
            console.log('the song to edi is now :', this.song);
          }
        })
    ]
  }

  ngOnDestroy(){
    this.subs.forEach((val, i, arr)=>{
      val.unsubscribe();
    })
  }

}
