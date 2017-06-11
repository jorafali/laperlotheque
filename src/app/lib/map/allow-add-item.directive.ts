import { Directive, Input } from '@angular/core';
import { MapDataService } from './map-data.service';

@Directive({
  selector: '[app-allow-add-item]',
  exportAs: 'addItem'
})
export class AllowAddItemDirective {

	@Input('app-allow-add-item') isAdmin: boolean;
	private _addItemDatum: any = {
		id: 0,
		coordinates: [400, 400]
	}

  constructor(private mapDataService: MapDataService) {
  	this._addItemDatum = this.mapDataService.layoutData([this._addItemDatum]);
  	console.log(this._addItemDatum);
  	this.mapDataService.observables.data
  }

}
