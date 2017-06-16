import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../lib/authentication/auth.service';
import { MapDataService } from '../../../lib/map/map-data.service';

import { EditSongControlService} from '../edit-song-control.service';
import { SongService, UpdateableSongFieldsEnum } from '../../song.service';
import { Song } from '../../song';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit, OnDestroy {

  private _accountId;
  private _subs: Array<Subscription>;
  private _oldSong: Song;

	get song(): EditSongControlService {
		return this.editSongControlService;
	};
	set song(val){
		this.editSongControlService = val;
	};

  constructor(
  	private editSongControlService: EditSongControlService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private mapDataService: MapDataService
    ) {

  }

  public cancelEditSong(){
    this.router.navigate([{outlets: {p:null}}])
  };

  public saveChanges() {
    let propertiesToUpdate: Array<UpdateableSongFieldsEnum> = [];
    console.log('saveChanges:propertiesToUpdate',propertiesToUpdate)
    let obsChain: any;
    // Observable<Song>;
    // looks for changing properties that need updating
    for(let enumIdx in UpdateableSongFieldsEnum){
      if(this.song[UpdateableSongFieldsEnum[enumIdx]] !== this._oldSong[UpdateableSongFieldsEnum[enumIdx]]){
        // add this property to the array of properties to update
        console.log(UpdateableSongFieldsEnum[enumIdx])
        propertiesToUpdate.push(+enumIdx);
      }
    };
    // updates prop if any value has changed
    if(propertiesToUpdate.length > 0){
      if(this.song.id !== null){
        obsChain = this.editSongControlService.updateSongAttributes(propertiesToUpdate);
      } else {
        obsChain = this.editSongControlService.createSong(this._accountId);
      }
    };

    if(this.editSongControlService.audioFile){
      console.log('audioFile to upload')
      if(obsChain){
        obsChain = Observable.from(obsChain)
          .flatMap(song=>this.editSongControlService.uploadAudioFile())
      } else {
        obsChain = this.editSongControlService.uploadAudioFile()
      }
    }

    if(this.editSongControlService.thumbnailFile){
      console.log('thumbnailFile to upload')
      if(obsChain){
        obsChain = Observable.from(obsChain)
          .flatMap(song=>this.editSongControlService.uploadThumbnailFile())
      } else {
        obsChain = this.editSongControlService.uploadThumbnailFile()
      }
    }

    if(obsChain){
      obsChain 
        .subscribe(song=>{
          console.log('saved changes to song :', song);
          this.song.audioFile = null;
          this.mapDataService.subjects.data.next([song]);
        }, error=>{console.log('an error has occured :', error)})
    } else {
      console.log('no changes were made to the song')
    }
    
  }

  ngOnInit() {
     
    this._subs = [
      this.authService.observables.accountLoggedIn.subscribe(
        account=>{this._accountId = account.local.accountId}
      ),
      // data from queryParam resolve
      this.route.data
        .subscribe((data: {song?: any})=>{
          let song = data.song;
          if (song){
            this.song.id = song.id;
            this.song.title = song.title;
            this.song.artist = song.artist;
            this.song.description = song.description;
            this.song.tags = song.tags;
            this.song.thumbnailUrl = song.thumbnailUrl;
            this.song.trackUrl = song.trackUrl;

            console.log('the song to edi is now :', this.song);
          } else {
            this.song.id =null;
            this.song.title =null;
            this.song.artist =null;
            this.song.description =null;
            this.song.tags =null;
            this.song.thumbnailUrl = null;
            this.song.trackUrl = null;
            console.log('the song to edi is now :', this.song);
          }
          // when constructing the class, take a snapshot of the song to update
          this._oldSong = new Song(this.song as Song);
        })
    ]
  }

  ngOnDestroy(){
    if(this._subs){
      this._subs.forEach((val, i, arr)=>{
        val.unsubscribe();
      });
    };
    this.editSongControlService.teardown();
  }

}
