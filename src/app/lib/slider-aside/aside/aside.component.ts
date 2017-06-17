import { Component, OnInit,
  HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SlideLeftIn, SlideRightOut, FadeOut } from '../../animations/animations';

@Component({
  selector: '[app-aside]',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  animations: [
    SlideLeftIn,
    SlideRightOut,
    FadeOut
  ]
})
export class AsideComponent implements OnInit {

  @HostBinding('@slideLeftIn') slideLeftIn = '';
  @HostBinding('@slideRightOut') slideRightOut = '';
  @HostBinding('@fadeOut') fadeOut;

  public here = true;

  @HostListener('document:keydown', ['$event']) onEscapePressed = (event) => {
    if ((event.which || event.keyCode) === 27){
      this.animateIt();
      setTimeout(()=>{this.closeAside()}, 300)
    }
  }

  closeAside() {
    this.router.navigate([{outlets: {s: null}}]);
  }
  animateIt() {
    this.slideRightOut = 'rightOut';
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
