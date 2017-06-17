import { Directive, ElementRef, 
   HostListener, Output, EventEmitter } from '@angular/core';
import { zoom as d3Zoom, ZoomBehavior, D3ZoomEvent, zoomTransform, ZoomTransform, zoomIdentity,
        event as d3event, 
        Selection, select, selection } from 'd3';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
  selector: '[appZoom]',
  exportAs: 'appZoom'
})
export class ZoomDirective {

  @HostListener('mousemove', ['$event']) updateMouseCoordinates = (ev) => {
    let x, y;
    x = (ev.offsetX - this._zoomTransform.x) / this._zoomTransform.k;
    y = (ev.offsetY - this._zoomTransform.y) / this._zoomTransform.k;
    this._subjects.zoomMouseCoordinates.next([x, y]);
    this._mouseCoordinates = [x,y];
  };
  
	// public zoomTransform = zoomIdentity;
  private _subjects = {
    zoomTransform: new BehaviorSubject<ZoomTransform>(zoomIdentity),
    zoomMouseCoordinates: new BehaviorSubject<Array<number>>([0,0])
  };
  public observables = {
    zoomTransform: this._subjects.zoomTransform.asObservable(),
    zoomMouseCoordinates: this._subjects.zoomMouseCoordinates.asObservable()
  }

  private _zoomTransform = zoomIdentity;
  private _mouseCoordinates: Array<number>;

 	private _hostSvg;
  private _hostSelection;
	private _zoomBehavior: ZoomBehavior<any, any>;

	readonly center: [number, number] = [0,0];
	readonly scaleExtent: [number,number] = [.37, 1.5];

  constructor(private el: ElementRef) {
    // assigns host to private property and instantiate a d3 selection
  	this._hostSvg = this.el.nativeElement;
  	this._hostSelection = select(this._hostSvg);

  	// setup the zoom behaviour
  	this._zoomBehavior = d3Zoom()
  		.on('zoom', this.zoomed)
  		.scaleExtent(this.scaleExtent);

  	// apply zoom listeners to hostElement
  	this._zoomBehavior(this._hostSelection);
  }

  private zoomed = ()=> {
			// assign zoom transform
      this._subjects.zoomTransform.next(d3event.transform);
      this._zoomTransform = d3event.transform;
		}
}
