import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { D3HexbinService } from './layout/d3-hexbin.service';
import 'rxjs/add/operator/filter';
@Injectable()
export class MapDataService {

public layoutData: (data: Array<any>) => Array<any>;

private _data: Array<any> = [];
public data: Array<any> = [];

public subjects = {
data: new BehaviorSubject<Array<any>>(this._data)
};

public observables = {
	// tslint:disable:indent
	newData: this.subjects.data.asObservable()
		.filter((data) => {
			if (!data) {
				return false;
			} else {
				return true;
			}
		})
		.do(data => {
			for ( const datum of data){
				const i = this._data.findIndex((d, idx, arr)=>{
					return datum.id === d.id;
				});
				if (i > -1) {
					this._data[i] = datum;
				} else {
					this._data.push(datum);
				}
			}
		})
		.map((data) => {
			const newData = this.layoutData(data);
			for(const datum of newData){
				const i = this.data.findIndex((d, idx, arr) => {
					return datum[0].id === d[0].id;
				});
				if (i > -1) {
					this.data[i] = datum;
				} else {
					this.data.push(datum);
				}
			}
			// console.log('data :', this.data);
			return newData;
		})
};

constructor(private d3HexbinService: D3HexbinService) {}

public initLayout(conf: any){
	switch (conf.type) {
			case 'HEX' :
				this.d3HexbinService.hexbin
					.radius(conf.radius || this.d3HexbinService.hexagonRadius)
					.x(conf.xAccessor || function(d){return d[0]})
					.y(conf.yAccessor || function(d){return d[1]})
				this.layoutData = this.d3HexbinService.transform;
				break;
			default:
				this.layoutData = function(d){return d};
				break;
		};
}

}
