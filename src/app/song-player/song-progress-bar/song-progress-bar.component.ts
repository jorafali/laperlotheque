import { Component, OnInit, ViewChild, ElementRef,
  Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { Slider } from '../../lib/components-template/slider/slider';

@Component({
  selector: '[app-song-progress-bar]',
  templateUrl: './song-progress-bar.component.html',
  styleUrls: ['./song-progress-bar.component.css']
})
export class SongProgressBarComponent extends Slider implements OnInit, AfterViewInit {
  @ViewChild('sliderBar') sliderBar: ElementRef;
  @ViewChild('sliderProgress') sliderProgress: ElementRef;

  // this value is used to display a secondary thumb when the user is over the slider
  private _mouseoverThumbWidth: number = null;
  // when the mouse leaves the slider then the secondary thumb is removed from the DOM via ngIf
  @HostListener('mouseleave') hideSecondThumb = () => {
    this._mouseoverThumbWidth = null;
  }

  constructor(renderer: Renderer2, private el: ElementRef) {
    super(renderer);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.htmlSliderBarContainer = this.el.nativeElement;
    this.htmlSliderProgressContainer = this.sliderProgress.nativeElement;
    this.onMousemove.subscribe((ev) => {
      this._mouseoverThumbWidth = +ev * 100;
    });
    super.ngAfterViewInit();
  }

}
