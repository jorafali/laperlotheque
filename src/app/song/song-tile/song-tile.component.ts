import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router' ;
import { PlaylistControlService } from '../../../assets/lib/soundplayer/playlist-control.service';
import { PlayerService } from '../../../assets/lib/soundplayer/player.service';
import { AuthService } from '../../../assets/lib/authentication/auth.service';
import { Song } from '../song';


@Component({
  selector: '[app-song-tile]',
  templateUrl: './song-tile.component.html',
  styleUrls: ['./song-tile.component.css']
})
export class SongTileComponent implements OnInit {
	@Input() song: Song;

  songPlaying: any = {details: {}, soundObject: {}};
  isAdmin: boolean;

  // CONSTRUCTOR
  constructor(
    private router: Router, 
    private playlistControlService: PlaylistControlService, 
    private playerService: PlayerService,
    private authenticationService: AuthService) {
    // this.songPlaying.soundObject = this.playerService.soundObject || {position: 0, duration:1, paused: true} ;

    // REGISTERS observers on player sound event streams 
    this.playerService.observables.songPlaying.subscribe(
      sound => {
        this.songPlaying.soundObject = sound;
      },
      error => {console.log('an error occured trying to stream sound event whileplaying :', error)},
      () => {console.log('observable contract completed')} 
     );

    this.authenticationService.observables.isAdmin.subscribe(
      isAdminFlag => {this.isAdmin = isAdminFlag},
      error => {
        console.log('an error occured trying to observe isAdmin :', error);
        this.isAdmin = false;
      }
    );
  }

  navigateToDetail = () => {
    this.router.navigate(['/song', this.song.id]);
  };

  navigateToEdit = (event: MouseEvent) => {
    event.stopPropagation();
    this.router.navigate([{outlets: {p: 'upload/edit'}}], {queryParams: {editSongId: this.song.id}})
    // this.router.navigate(['upload','edit', {outlets: {p: 'edit'}}], {queryParams: {editSongId: this.song.id}})
  };

  play = (event: MouseEvent, song) => {
    // stop bubbling of click event
    event.stopPropagation();

    console.log('attempted play song')
    this.playlistControlService.playSongNow(song);
  };

  ngOnInit() {
  }

}