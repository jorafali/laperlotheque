import { Injectable } from '@angular/core';
import { hexbin as d3Hexbin, Hexbin} from 'd3-hexbin';

@Injectable()
export class D3HexbinService {

  public hexbin: Hexbin<Array<number>> = d3Hexbin();
	readonly hexagonRadius: number = 100;

	constructor(){}

  public transform = (value: Array<Array<number>>, xAccessor?: any, yAccessor?: any)=> {
  	console.log('inside hexbin pipe')
  	if(!xAccessor){
  		let bin = this.hexbin(value);
  		return bin;	
  	} else {
  		this.hexbin.x(xAccessor);
  		this.hexbin.y(yAccessor);
  		let bin = this.hexbin(value);
  		return bin;
  	}
  }

}
