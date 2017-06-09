import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: '[app-volume-slider]',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.css']
})
export class VolumeSliderComponent implements OnInit, OnChanges {

	@Input('volume') volume: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

}
