import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot  } from '@angular/router'
import { Observable } from 'rxjs' ;

import { Song } from './song';
import { AuthService} from '../lib/authentication/auth.service';

export enum UpdateableSongFieldsEnum {
  coordinates,
  title,
  artist,
  description,
  published,
  tags,
  trackUrl,
  thumbnailUrl
}

export enum ImageTypesEnum {
  thumbnail,
  landscape
}

@Injectable()
export class SongService {

  private _accountId: any;

  constructor(
  	private http: Http,
    private authService: AuthService) {

    this.authService.observables.accountLoggedIn.subscribe(
      (account) => {
        this._accountId = account? account.local.accountId: null;
      }
    )
  }

  public getSongs(filter?): Observable<Song[]> {
  	let observable = this.http.get(`api/songs`)
      .map((r: Response)=>{
        let jsonResp = r.json() as Array<any>;
        let resp = [];
        jsonResp.forEach((val, i, arr) => {
        	let aSong: Song = this.newSong(val);
        	resp.push(aSong);
        })
        // console.log('fetched some songs',resp);
        return resp;
      })
    return observable;
  }

  public getSong(id: any): Observable<Song>{
    let searchParams: URLSearchParams = new URLSearchParams();
    searchParams.set('filter', '{"include": {"relation":"attachments"}}');
    let observable = this.http.get('api/songs/'+id, {search: searchParams})
    //, {headers: authHeader}
      .map((r: Response)=>{
        let resp = this.newSong(r.json());
        console.log(resp)
        return resp
      })
    return observable
  }

  public createSong(song, accountId): Observable<Song> {
    let observable = this.http.post('api/accounts/'+accountId+'/songs', song)
      .map((r: Response)=>{
        return this.newSong(r.json());
      })
    return observable;
  }

  public updateSongAttributes(id, attributes: any): Observable<Song> {
    return this.http.patch('api/songs/'+id, attributes)
      .map((r: Response)=>{
        return this.newSong(r.json());
      })
  }

  public uploadAudioFile = (audioFile, songId): Observable<Song> => {
    let observable: Observable<Song>;

    if (typeof audioFile === 'undefined' || audioFile === null) {
       console.log('no audio to upload');
       return Observable.throw('no files to upload');
    }

    // creates promise with XHR api
    let promise: Promise<Song>;
    promise = new Promise<Song | Error>((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      // sets an id id query param if available
      let url ='api/songs/track?id='+songId;

      // add file to formData 
      formData.append('audioFile', audioFile, audioFile.name);

      // registers XHR event listeners 
      xhr.onreadystatechange = ()=>{
        // if readyState is 1 : ready to set Headers
        if (xhr.readyState == 1){
        }
        // if readyState is 3 : loading things
        if (xhr.readyState == 3){
          console.log('loading things');
        }
        // if readyState is 4 : done doing things
        if (xhr.readyState == 4){
          console.log('xhr done 4:', xhr.readyState)
          //if the response is success 
          if (xhr.status == 200) {
            console.log('xhr response Song:',this.newSong(JSON.parse(xhr.response).song));
            // the response body is {song:{}}
            resolve(this.newSong(JSON.parse(xhr.response).song));
          } else if (xhr.status == 401) {
            console.log('xhr response :',xhr.response);
            // need to throw error here
            reject(JSON.parse(xhr.response) as Error);
          } else {
            console.log(xhr.response)
            // need to throw error here
            reject(JSON.parse(xhr.response) as Error);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    })
    observable = Observable.fromPromise(promise);
    return observable
  }

  public uploadImageFile(imageType: ImageTypesEnum, imageFile, songId ): Observable<Song>{
    let observable: Observable<Song|Error>;

    if (typeof imageFile === 'undefined' || imageFile === null) {
       console.log('no image to upload');
       return Observable.throw(new TypeError('no files to upload'));
    }

    // creates promise with XHR api
    let promise: Promise<Song>;
    promise = new Promise<Song | Error>((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      let url = 'api/songs/image/'+ImageTypesEnum[imageType]+'?id='+songId;

      // add file to formData 
      formData.append('imageFile', imageFile, imageFile.name);

      // registers XHR event listeners 
      xhr.onreadystatechange = ()=>{
        // if readyState is 1 : ready to set Headers
        if (xhr.readyState == 1){
        }
        // if readyState is 3 : loading things
        if (xhr.readyState == 3){
          console.log('loading things');
        }
        // if readyState is 4 : done doing things
        if (xhr.readyState == 4){
          console.log('xhr done 4:', xhr.readyState)
          //if the response is success 
          if (xhr.status == 200) {
            console.log('xhr response :',xhr.response);
            // the response body is {song:{}}
            resolve(this.newSong(JSON.parse(xhr.response).song));
          } else if (xhr.status == 401) {
            console.log('xhr response :',xhr.response);
            reject(JSON.parse(xhr.response) as Error);
          } else {
            console.log(xhr.response)
            reject(JSON.parse(xhr.response) as Error);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    })
    observable = Observable.fromPromise(promise);
    return observable
  }

  private newSong(obj: any):Song {
  	return new Song(obj);
  }
}


// SONG RELATED RESOLVERS
/*

*/
@Injectable()
export class SongResolveService implements Resolve<Observable<Song>>{

  constructor(  private router: Router, 
                private songService: SongService) { }

  // this resolves one song based on id param
  resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> => {

    return this.songService.getSong(route.params['id'])
      .catch(error => {
        console.log('could not resolve song with route param',error);
        this.router.navigate(['']);
        return Observable.of(null);
      })
  };

}
