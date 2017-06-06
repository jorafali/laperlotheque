import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[app-slider-cursor]'
})
export class SliderCursorDirective {

	@Input('app-slider-cursor') sliderBar: any;

	// @HostListener('dragstart', ['$event']) onMousedown = function(event){
	// 	console.log('on dragstart on cursor',event);
	// 	// I need the position of the cursor in the containing div
	// 	// I need to be able to track where the mouse is going relative to the original position along the x axis
	// }

	// @HostListener('drag', ['$event']) onMouseup = function(event){
	// 	console.log('on drag on cursor',event);
	// 	// I need the position of the cursor in the containing div
	// 	// I need to be able to track where the mouse is going relative to the original position along the x axis
	// }


  constructor(private el: ElementRef) {
  	let cursor = this.el.nativeElement ;
  	cursor.style.cursor = 'pointer';

  	// drag cursor only relative to x-axis
  	cursor.onmousedown = function(e) {
  		console.log(e)
	    e = e || window.event;
	    var start = 0, diff = 0;
	    if( e.pageX) start = e.pageX;
	    else if( e.clientX) start = e.clientX;

	    cursor.style.position = 'relative';
	    document.body.onmousemove = function(ev) {
	        ev = ev || window.event as MouseEvent;
	        var end = 0;
	        if( ev.pageX) end = ev.pageX;
	        else if( ev.clientX) end = ev.clientX;

	        diff = end-start;
	        cursor.style.left = diff+"px";
	    };
	    document.body.onmouseup = function() {
	        // do something with the action here
	        // cursor has been moved by diff pixels in the X axis
	        cursor.style.position = 'static';
	        document.body.onmousemove = document.body.onmouseup = null;
	    };
	}
  }

}
