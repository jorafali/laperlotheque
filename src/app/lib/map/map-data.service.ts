import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { D3HexbinService } from './layout/d3-hexbin.service';

@Injectable()
export class MapDataService {

	constructor(private d3HexbinService: D3HexbinService) {}

	private layoutData: (data: Array<any>)=>Array<any>;

	public subjects = {
		data: new BehaviorSubject<Array<any>>(null)
	}
	public observables = {
		data: this.subjects.data.asObservable()
			.filter((data)=>{
				if(!data){return false}
					else {return true}
			})
			.map((data)=>{
				let newData = this.layoutData(data);
				console.log(newData);
				return newData
			})
	}

	public initLayout(conf: any){
		switch (conf.type) {
				case "HEX":
					this.d3HexbinService.hexbin
						.radius(conf.radius || this.d3HexbinService.hexagonRadius)
						.x(conf.xAccessor || function(d){return d[0]})
						.y(conf.xAccessor || function(d){return d[1]})

					this.layoutData = this.d3HexbinService.transform;
					break;
				default:
					this.layoutData = function(d){return d};
					break;
			}	
	}

}
