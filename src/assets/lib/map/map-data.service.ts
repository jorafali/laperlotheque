import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MapDataService {

	public subjects = {
		data: new BehaviorSubject<Array<any>>(null)
	}
	public observables = {
		data: this.subjects.data.asObservable()
	}

  constructor() { }

}
