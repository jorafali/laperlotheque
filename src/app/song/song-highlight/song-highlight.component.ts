import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { SongService } from '../song.service';
import { Song } from '../song';
import { PlaylistControlService } from '../../lib/soundplayer/playlist-control.service';

@Component({
  templateUrl: './song-highlight.component.html',
  styleUrls: ['./song-highlight.component.css']
})
export class SongHighlightComponent implements OnInit {

  public song: Song;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private playlistControlService: PlaylistControlService ) { }

  play = (event: MouseEvent, song) => {
    // stop bubbling of click event
    event.stopPropagation();
    // console.log('attempted play song')
    this.playlistControlService.playSongNow(song);
  }

  @HostListener('document:keydown', ['$event']) onEscapePressed = (event) => {
    if ((event.which || event.keyCode) === 27) {
      this.router.navigate([{outlets: {s: null}}]);
    }
  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: {song: Song}) => {
        this.song = data.song;
        console.log('song highlight\'s song is now :', this.song);
      });
  }

}
