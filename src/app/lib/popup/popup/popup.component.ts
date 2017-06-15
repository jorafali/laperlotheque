import { Component, OnInit, HostListener, HostBinding, 
  ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate} from '@angular/animations';
import { FadeIn, FadeOut, SlideUpOut, SlideUpIn} from '../../animations/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    FadeIn,
    FadeOut,
    SlideUpOut,
    SlideUpIn
  ],
  host: {
    '[@fadeIn]': '',
    '[@slideUpIn]': ''
  }
})
export class PopupComponent implements OnInit {

  @ViewChild('container') content: ElementRef;

  @HostListener('document:keydown', ['$event']) onEscapePressed = (event) => {
    if ((event.which || event.keyCode) == 27){
      this.closePopup()
    }
  }
  @HostListener('click') onclick(){
    this.closePopup()
  }

  constructor(
  	private router: Router) { }

  closePopup(){
  	this.router.navigate([{outlets: {p: null}}])
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.content.nativeElement.addEventListener('click', function(ev){ev.stopPropagation()})
  }

}
