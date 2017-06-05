import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginFailed: boolean;

  constructor(
  	private router: Router,
  	private authService: AuthService) { }

  goToRegister = () => {
  	this.router.navigate(['register']);
  }

  login(f: NgForm){
  	let credentials = {
  		username: f.value.username,
  		password: f.value.password
  	};
  	this.authService.login(credentials)
  		.subscribe(
      success=>{
        console.log('logged in :',success);
  		},
  		error=>{
        if(error.json().error.statusCode == 401){
          this.loginFailed = true;
        }
  			console.log('error in login :',error.json());
  		},
  		()=>{
        // this.isLoggedIn = true;
        this.router.navigate([{outlets: {p:'authenticating'}}]);
        console.log('Login completed')
      })
  }

  ngOnInit() {
  }

}
