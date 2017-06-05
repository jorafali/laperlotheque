import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { Selection, select, selection, ZoomTransform,
        scaleLinear as d3ScaleLinear,
        axisBottom } from 'd3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
 
@Directive({
  selector: '[appXAxis]'
})
export class XAxisDirective implements OnInit {

	@Input('appXAxis') private srcTransformObs: Observable<ZoomTransform>;
	
	private hostSvg;
	private hostSVGSelection;

  private xAxis;
  private xScale;
  private xRescaled;

  constructor(private el: ElementRef) {
  	this.hostSvg = this.el.nativeElement;
  	this.hostSVGSelection = select(this.hostSvg);

  	// create the xAxis with pixel/10(xScale) unit
    this.xScale = d3ScaleLinear()
      .domain([0, this.hostSvg.parentElement.clientWidth/10])
      .range([0, this.hostSvg.parentElement.clientWidth])

  	// create xAxis with the rescaled scale
    this.xAxis = axisBottom(this.xScale).ticks(4);
    this.hostSVGSelection.call(this.xAxis);
  }

  ngOnInit(){
  	// subscribe to provided Input Observable 
  	this.srcTransformObs.subscribe(
  		transformValue => {
  			this.xRescaled = transformValue.rescaleX(this.xScale);
  			this.xAxis.scale(this.xRescaled);
      	this.hostSVGSelection.call(this.xAxis);
  		}
  	)
  }
}
