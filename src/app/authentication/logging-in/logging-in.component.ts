import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-logging-in',
  templateUrl: './logging-in.component.html',
  styleUrls: ['./logging-in.component.css']
})
export class LoggingInComponent implements OnInit {

  public message: string = 'LOGGIN IN ...';

  constructor(
  	private authService: AuthService,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.authService.updateLoginStatus().subscribe(
  		success => {
  			console.log('authenticated with :', success);
  			this.router.navigate([{outlets: {p: null}}])
  		},
      error=> {
        console.log('an error has occured logging in :', error);
        this.message = 'Something went wrong :('
        setTimeout(()=>{
          this.router.navigate([{outlets: {p: 'login'}}])
        }, 2000);
      })
  }

}
