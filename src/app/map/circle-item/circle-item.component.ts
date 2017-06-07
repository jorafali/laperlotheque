import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-circle-item]',
  templateUrl: './circle-item.component.html',
  styleUrls: ['./circle-item.component.css']
})
export class CircleItemComponent implements OnInit {

	@Input('app-circle-item') data: any;
  constructor() { }

  ngOnInit() {
  }

}
