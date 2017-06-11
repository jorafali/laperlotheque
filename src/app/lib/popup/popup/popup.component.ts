import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @HostListener('document:keydown', ['$event']) onEscapePressed = (event) => {
    console.log(event.which || event.keyCode)
    if ((event.which || event.keyCode) == 27){
      this.closePopup()
    }
  }

  constructor(
  	private router: Router) { }

  closePopup(){
  	this.router.navigate([{outlets: {p: null}}], {queryParamsHandling: 'merge'})
  }

  ngOnInit() {
  }

}
