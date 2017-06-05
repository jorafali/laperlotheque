import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnChanges {

	@Input('source') source: any;

  constructor() { }

  ngOnInit() {
  	console.log('slider component input source is :', this.source)
  }

  ngOnChanges(){
  }

}
