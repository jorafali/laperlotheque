import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'circle[app-circle]',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

	@Input() cx: number;
	@Input() cy: number;
	@Input() r: number;

  constructor() { }

  ngOnInit() {
  }

}
