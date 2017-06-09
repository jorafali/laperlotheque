import { Directive, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { Selection, select, selection, ZoomTransform,
        scaleLinear as d3ScaleLinear,
        axisRight } from 'd3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
 
@Directive({
  selector: '[appYAxis]'
})
export class YAxisDirective implements OnInit, AfterViewInit {

	@Input('appYAxis') private srcTransformObs: Observable<ZoomTransform>;
	
	private hostSvg;
	private hostSVGSelection;

  private yAxis;
  private yScale;
  private yRescaled;

  constructor(private el: ElementRef) {
  	this.hostSvg = this.el.nativeElement;
  	this.hostSVGSelection = select(this.hostSvg);
  }

  ngOnInit(){
  };

  ngAfterViewInit(){
    // create the yAxis with pixel/10(yScale) unit
    this.yScale = d3ScaleLinear()
      .domain([0, this.hostSvg.parentElement.clientHeight/10])
      .range([0, this.hostSvg.parentElement.clientHeight])

    // create yAxis with the rescaled scale
    this.yAxis = axisRight(this.yScale).ticks(4);
    this.hostSVGSelection.call(this.yAxis);
    
    // subscribe to provided Input Observable 
    this.srcTransformObs.subscribe(
      transformValue => {
        this.yRescaled = transformValue.rescaleY(this.yScale);
        this.yAxis.scale(this.yRescaled);
        this.hostSVGSelection.call(this.yAxis);
      }
    )
  }
}
