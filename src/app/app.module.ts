import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// Custom modules
// LIB
import { AuthenticationModule } from './lib/authentication/authentication.module';
import { D3MapModule } from './lib/map/map.module';

// FEATURES
import { MapModule } from './map/map.module';
import { SoundplayerModule } from './lib/soundplayer/soundplayer.module';
import { SongPlayerModule } from './song-player/song-player.module';


const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // custom moduels
    // libs
    AuthenticationModule,
    D3MapModule,
    // features
    MapModule,
    SoundplayerModule,
    SongPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
