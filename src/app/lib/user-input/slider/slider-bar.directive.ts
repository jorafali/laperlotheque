import { Directive, ElementRef, 
		Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[app-slider-bar]',
  exportAs: 'appSliderBar'
})
export class SliderBarDirective implements OnInit{

	@Input('slider-source') source: any;

	private host;
	
  constructor(private el: ElementRef) {
  	this.host = this.el.nativeElement;
  	this.host.style.display = 'flex';
  }

  ngOnInit(){
  }
}
