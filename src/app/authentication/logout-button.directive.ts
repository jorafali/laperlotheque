import { Directive, HostListener } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[app-logout-button]'
})
export class LogoutButtonDirective {

  @HostListener('click') logout(){
		this.authService.logout().subscribe(
			success => {
				console.log('logged out');
				this.router.navigate(['', {outlets: {p: null}}])
			});
	};

  constructor(
  	private authService: AuthService,
  	private router: Router) {
  }

}
