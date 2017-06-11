import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';

import { Song } from '../song';

import { SongService, UpdateableSongFieldsEnum, ImageTypesEnum } from '../song.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class EditSongControlService {

	private _songToEdit: Song = null;
	private _songToEditSubject: BehaviorSubject<Song> = new BehaviorSubject<Song>(this._songToEdit);

	constructor(private songService: SongService, 
				private router: Router) {}

	public audioFile: any;
	public thumbnailFile: any;

	public observables = {
		songToEdit: this._songToEditSubject.asObservable().do(val => {console.log('data wanted from songToEdit obs :',val)})
	};

	set coordinates(coordinates: [number, number]){
		this._songToEdit.coordinates = coordinates;
		this._songToEditSubject.next(this._songToEdit);
	}

	set id(val: any){
		this._songToEdit.id = val;
		this._songToEditSubject.next(this._songToEdit);
	}
	get id(){
		return this._songToEdit.id;
	}

	set userId(val: any){
		this._songToEdit.userId = val;
		this._songToEditSubject.next(this._songToEdit);
	}
	get userId(){
		return this._songToEdit.userId;
	}

	set title(val: string){
		this._songToEdit.title = val;
		this._songToEditSubject.next(this._songToEdit);
	}
	get title(){
		return this._songToEdit.title;
	}

	set artist(val: string){
		this._songToEdit.artist = val;
		this._songToEditSubject.next(this._songToEdit);
	}
	get artist(){
		return this._songToEdit.artist;
	}

	set description(val: string){
		this._songToEdit.description = val;
		this._songToEditSubject.next(this._songToEdit);
	}
	get description(){
		return this._songToEdit.description;
	}

	set thumbnailUrl(val: string){
		this._songToEdit.thumbnailUrl = val;
		this._songToEditSubject.next(this._songToEdit);
	}
	get thumbnailUrl(){
		return this._songToEdit.thumbnailUrl;
	}

	set tags(val: Array<string>|string){
		let newTags: Array<string> = [];
		if(typeof val === 'string'){
			newTags = val.split(' ');
		} else {
			newTags = val as Array<string>;
		}
		this._songToEdit.tags = newTags;
		this._songToEditSubject.next(this._songToEdit);
	}
	get tags(){
		return this._songToEdit.tags;
	}

	public initNewSongToEdit(song?: Song){
		if(!song){
			this._songToEdit = new Song(Song.emptySong);
		} else {
			this._songToEdit = new Song(song);
			// here I version the edited song's thumbnailUrl so that it forces the view to re-render the image
			// that is because in actuality the Url doesn't change, only the underlying asset has changed in the Store
			this.thumbnailUrl = this.thumbnailUrl+'?v='+Date.now().toString(36);
		};
	}

	public createSong(song: Song, accountId){
		return this.songService.createSong(song, accountId)
			.do(song=>console.log('created song :', song));
	}

	public updateSongAttributes(attrNames: Array<UpdateableSongFieldsEnum>): Observable<Song>{
		if(attrNames.length < 1){
			return Observable.throw({error: 'no fields to update have been specified'});
		}
		let dataFields = {};
		attrNames.forEach((val, i, arr)=>{
			let field: string = UpdateableSongFieldsEnum[val];
			dataFields[field] = this[field];
		})
		console.log('fields to be updated', dataFields);
		return this.songService.updateSongAttributes(this.id, dataFields)
			.do(success=>{
				// uploaded a file successfully so can reset the audioFIle property to null;
				this.initNewSongToEdit(success);
			});
	};

	public uploadAudioFile(): Observable<Song> {
		if(!this.audioFile){
			return Observable.throw({error: 'no audio to upload'});
		}
		return this.songService.uploadAudioFile(this.audioFile, this.id)
			.do(success=>{
				// uploaded a file successfully so can reset the audioFIle property to null;
				this.audioFile = null;
				this.initNewSongToEdit(success);
			})
	}

	public uploadThumbnailFile(): Observable<Song>{
		if(!this.thumbnailFile){
			return Observable.throw({error: 'no thumbnail to upload'});
		}
		return this.songService.uploadImageFile(ImageTypesEnum.thumbnail, this.thumbnailFile, this.id)
			.do(success=>{
				// uploaded a file successfully so can reset the audioFIle property to null;
				this.thumbnailFile = null;
				this.initNewSongToEdit(success);
			})	
	}

}

@Injectable()
export class EditSongIdParamResolveService implements Resolve<Observable<Song>>{

  constructor(  private router: Router, 
                private songService: SongService) { }

  // this resolves one song based on id param
  resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> => {

  	if(!route.queryParams.editSongId){return Observable.of(null)}
    return this.songService.getSong(route.queryParams.editSongId)
      .catch(error => {
        console.log('Could not resolve song with from query param editSongId',error);
        return Observable.of(null);
      })
  };

}