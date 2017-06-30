import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PlaylistControlService } from '../../lib/soundplayer/playlist-control.service';
import { SongService } from '../../song/song.service';

import 'rxjs/add/operator/skip';

@Component({
  selector: '[app-playlist]',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  public songs: Array<any>;

  constructor(private playlistControlService: PlaylistControlService,
              private songService: SongService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // gets playlist songs from song playlist control
    this.playlistControlService.observables.playlist
    .filter((songs) => {
      return songs ? true : false;
    })
    .subscribe(
      (songs) => {
        const ids = songs.map((s, idx, arr) => {return s.id; });
        const navExtras: NavigationExtras = {
          queryParams: {p: ids},
          queryParamsHandling: 'merge'
        };
        this.songs = songs;
        this.router.navigate([], navExtras);
      }
    );

    // watches params for p (for playlist) members. params.p is an array of song ids
    this.route.queryParams
    // skips the first streamed value as it is the initial load for the app and at that time the params are still empty
    .skip(1)
    /**
     * filters streamed params:
     * + if there are no ids in params.p then don't bother
     * + if there are no songs in the current playlist then continues
     * + if there are different numbers of songs in params.p and songs then continues
     * + if params.p is populated with different ids than songs then continues
     */
    .filter((params) => {
      if (
        (!params || !params.p) || (+params.p.length <= 0)
      ) {return false; }

      if (
        (!this.songs) || (params.length !== this.songs.length)
      ) {return true; };

      if (params.p) {
        params.p.forEach(element => {
          const isFound = this.songs.find((el) => {
            return el.id === element.id;
          });
          if (!isFound) {
            return true;
          }
        });
      }
      // DEFAULT if not returned already then return false
      return false;
    })
    .flatMap((params) => {
      console.log('params :', params);
      return this.songService.getSongsById(params.p);
    })
    .subscribe((songs) => {
      console.log('songs from params :', songs);
      // pushes songs to playlist
      songs.forEach(element => {
        this.playlistControlService.addSongToPlaylist(element);
      });
    });
  }

}
