import { Pipe, PipeTransform } from '@angular/core';
import { hexbin as d3Hexbin, Hexbin} from 'd3-hexbin';

@Pipe({
  name: 'd3Hexbin'
})
export class D3HexbinPipe implements PipeTransform {

	public hexbin: Hexbin<Array<number>> = d3Hexbin();
	readonly hexagonRadius: number = 100;

	constructor(){
		this.hexbin.radius(this.hexagonRadius);
	}

  transform(value: Array<Array<number>>, xAccessor?: any, yAccessor?: any): any {
  	console.log('inside hexbin pipe')
  	if(!xAccessor){
  		let bin = this.hexbin(value);
  		console.log('hexbin for ',value, 'is', bin);
  		return bin;	
  	} else {
  		this.hexbin.x(xAccessor);
  		this.hexbin.y(yAccessor);
  		let bin = this.hexbin(value);
  		return bin;
  	}
  }
}
