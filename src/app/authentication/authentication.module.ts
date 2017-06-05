import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PopupModule } from '../popup/popup.module';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthFacebookService } from './auth-facebook.service';
import { AuthService } from './auth.service';
import { LoginButtonDirective } from './login-button.directive';
import { LogoutButtonDirective } from './logout-button.directive';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoggingInComponent } from './logging-in/logging-in.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    outlet: 'p'
  },
  {
    path: 'authenticating',
    component: LoggingInComponent,
    outlet: 'p'
  }
]

@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    FormsModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
      LoginButtonDirective, 
      LogoutButtonDirective, 
      LoginFormComponent, 
      LoggingInComponent
    ],
  exports: [
      LoginButtonDirective, 
      LogoutButtonDirective,
      LoginFormComponent,
      LoggingInComponent
    ],
  providers: [
  		AuthFacebookService, 
  		AuthService,
  		CookieService
  	]
})
export class AuthenticationModule { }
