import { Directive, ElementRef, Input, HostBinding,
		OnInit } from '@angular/core';

import { SliderBarDirective } from './slider-bar.directive';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[app-slider-progress]'
})
export class SliderProgressDirective implements OnInit{

	@HostBinding('style.width.%') @Input('app-slider-progress') source: number;
	
	private host;

  constructor(private el: ElementRef) {
  	this.host = this.el.nativeElement;
  }

  ngOnInit(){
  }

}
