import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// Custom modules
// LIB
import { AuthenticationModule } from '../assets/lib/authentication/authentication.module';
import { D3MapModule } from '../assets/lib/map/map.module';

// FEATURES
import { MapModule } from './map/map.module';


const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // custom moduels
    // libs
    AuthenticationModule,
    D3MapModule,
    // features
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
