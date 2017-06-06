import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

	// PRIVATE PROPS
	// Local login API url 
	private apiUrl: string = 'api/accounts';
  private app: string = 'LP';
	// Source subjects with initial values
	private accountLoggedInSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	// Public properties to share with code consuming the service
	public observables = {
		isLoggedIn: this.isLoggedInSubject.asObservable().do(data => {
	      // console.log('data wanted from isLoginObs :', data);
	    }),
	    isAdmin: this.isAdminSubject.asObservable().do(data => {
	      // console.log('data wanted from isAdminObs :', data);
	    }),
	    accountLoggedIn: this.accountLoggedInSubject.asObservable().do(data => {
	      // console.log('data wanted from acctLogInObs :', data);
	    })  
	}

  constructor( 
  	private http: Http, 
  	private cookieService: CookieService) { }

  // register is not implemented yet as I will create local users manually
  // public register = function(){
  // }

  public login(credentials: any) :Observable<Response>{
  	let url: string = this.apiUrl+'/login';

  	return this.http.post(url, credentials)
      .do(user => {
        if (user) {
          // console.log('inside login - do :')
            // set access_token in browser ?
          let body = user.json();
          let accessToken: string = body.id;
          let userId = body.userId;

          console.log(user);
        }
      })
  }

  public logout(): Observable<Response>{
    // console.log('do logout');
    let url: string = this.apiUrl+'/logout';
    // let headers: Headers = new Headers();

    let teardownToken = () => {
        this.cookieService.remove('access_token');
        this.cookieService.remove('userId');
    };

    let teardownAuthProperties = () => {
        this.isLoggedInSubject.next(false);
        this.isAdminSubject.next(false);
        this.accountLoggedInSubject.next(false);
    }

    return this.http.post(url, {})
    // ,{headers: this.getAuthHeader(headers)}
      .do((success)=>{
        // on completion teardown accessToken
        teardownToken();
        teardownAuthProperties();
      })
      .catch((error) => {
        teardownToken();
        teardownAuthProperties();
        return error;
      })
  }

  public updateLoginStatus(): Observable<boolean>{

    if (!this.cookieService.get('access_token')) {
      console.log('no access_token');
      return Observable.of(false);
    } 

    return this.http.get(this.apiUrl+'/loginDetails')
      .map((resp: Response)=>{
        // If account data received then authenticated >> resp = true
        let acctdata = resp.json().account;
        if(acctdata === null){
          return false;
        } else {
          acctdata = this.parseAccoutData(acctdata);
          // console.log('do set properties and stream new values :', acctdata)
          this.isLoggedInSubject.next(true);
          this.isAdminSubject.next(acctdata.isAdmin);
          this.accountLoggedInSubject.next(acctdata);
          // logged in and propagated, can stream true
          return true
        }
      })
      .catch((error: Response)=>{
        let errBody
        try {
          errBody = error.json();
        } catch (err) {
          return Observable.throw(new Error(err))
        }
        if (errBody.statusCode == 401) {
          // probably expired token or wrong acctId, either way we want to re-login
          // so we go back to non authenticated state
          // console.log('invalid token, do teardown auth properties')
          // this.teardownAuthProperties();
          return Observable.of(false);
        } else {
          // unexpected cases , THROW
          return Observable.throw(new Error(errBody))
        }
      })
  }

  private parseAccoutData = (acctData: {username: string,identities: Array<any>, roles: Array<any>}) => {
    let acctLoggedIn = {};
    acctLoggedIn['local'] = {username: acctData.username};
    if (acctData.identities.length > 0) {
      acctData.identities.forEach((indentity, i, arr)=>{
        acctLoggedIn[indentity.provider] = indentity.profile._json;
      })
    }
    if (acctData.roles.length > 0) {
      acctData.roles.forEach((role, i, arr)=>{
        if(role.name == 'mottoAdmin'){
          acctLoggedIn['isAdmin'] = true;
        }      
      })
    }
    return acctLoggedIn;
  }

}
