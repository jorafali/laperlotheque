import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClipPathTypeEnum } from '../../lib/map/map.module';

import { PlaylistControlService } from '../../lib/soundplayer/playlist-control.service';
import { PlayerService } from '../../lib/soundplayer/player.service';
import { AuthService } from '../../lib/authentication/auth.service';
import { Song } from '../song';

@Component({
  selector: '[app-song-item]',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {

@Input('app-song-item') song: any;

  private clipPathType: string;

  private songPlaying: any = {details: {}, soundObject: {}};
  private isAdmin: boolean;

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistControlService: PlaylistControlService,
    private playerService: PlayerService,
    private authenticationService: AuthService) {

    // REGISTERS observers on player sound event streams
    this.playerService.observables.songPlaying.subscribe(
      sound => {
        this.songPlaying.soundObject = sound;
      },
      error => {console.log('an error occured trying to stream sound event whileplaying :', error); },
      () => {console.log('observable contract completed'); }
     );

    this.authenticationService.observables.isAdmin.subscribe(
      isAdminFlag => {this.isAdmin = isAdminFlag; },
      error => {
        console.log('an error occured trying to observe isAdmin :', error);
        this.isAdmin = false;
      }
    );
  };

  public play = (event: MouseEvent, song) => {
    // stop bubbling of click event
    event.stopPropagation();

    console.log('attempted play song');
    this.playlistControlService.playSongNow(song);
  }

public navigateToSongHighlight = (event: MouseEvent, songId) => {
  console.log(songId);
  event.stopPropagation();
  this.router.navigate([{outlets: {s: [this.song[0].id]}}]);
  return false;
}

public ngOnInit() {
  this.route.queryParams.subscribe(
    (p) => {
      this.clipPathType = ClipPathTypeEnum[+p.shape] || ClipPathTypeEnum[1];
    }
  );
}
}
