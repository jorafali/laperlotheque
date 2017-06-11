import { Directive, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './auth.service';

@Directive({
  selector: '[app-login-button]'
})
export class LoginButtonDirective implements OnInit {

	@HostListener('click') goToLogin(){
		this.router.navigate([{outlets: {p: 'login'}}], {queryParamsHandling:'merge'})
	};

  constructor(
  	private authService: AuthService,
  	private router: Router) {
  }

  ngOnInit() {
  	this.authService.updateLoginStatus().subscribe(
  		success => {
  			// console.log('updated login status with :', success);
  		})
  }

}
