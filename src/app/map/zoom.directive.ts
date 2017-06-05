import { Directive, ElementRef } from '@angular/core';
import { zoom as d3Zoom, ZoomBehavior, D3ZoomEvent, zoomTransform, ZoomTransform, zoomIdentity,
        event as d3event, 
        Selection, select, selection } from 'd3';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
  selector: '[appZoom]',
  exportAs: 'appZoom'
})
export class ZoomDirective {

	// public zoomTransform = zoomIdentity;
  private subjects = {
    zoomTransform: new BehaviorSubject<ZoomTransform>(zoomIdentity)
  }
  public observables = {
    zoomTransform: this.subjects.zoomTransform.asObservable()
  }

 	private hostSvg;
  private hostSelection;
	private zoomBehavior: ZoomBehavior<any, any>;

	readonly center: [number, number] = [0,0];
	readonly scaleExtent: [number,number] = [.37, 1.5];

  constructor(private el: ElementRef) {
    // assigns host to private property and instantiate a d3 selection
  	this.hostSvg = this.el.nativeElement;
  	this.hostSelection = select(this.hostSvg);

  	// setup the zoom behaviour
  	this.zoomBehavior = d3Zoom()
  		.on('zoom', this.zoomed)
  		.scaleExtent(this.scaleExtent);

  	// apply zoom listeners to hostElement
  	this.zoomBehavior(this.hostSelection);
  }

  private zoomed = ()=> {
			// assign zoom transform
      this.subjects.zoomTransform.next(d3event.transform);
		}
}
