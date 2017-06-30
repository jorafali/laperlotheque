import { Component, OnInit,
          HostBinding } from '@angular/core';
import { PlayerService } from '../lib/soundplayer/player.service';
import { PlaylistControlService } from '../lib/soundplayer/playlist-control.service';
import { Song } from '../song/song';

@Component({
  selector: '[app-soundplayer]',
  templateUrl: './soundplayer.component.html',
  styleUrls: ['./soundplayer.component.css']
})
export class SoundplayerComponent implements OnInit {

  public playlist: Array<Song>;
  public songPlaying: any;

  @HostBinding('class.displayPlaylist') private _displayPlaylist = true;

  // THIS CONSTRUCTOR registers observers on the playlist-control published streams
  /*
  By observing to the playlist-control service streams, this player doesn't care where the instructions are coming from
  It just acts upon receiving streamed events
  */
  constructor(
    private playlistControlService: PlaylistControlService) {

    this.playlist = this.playlistControlService.playlist as Array<Song>;
    this.songPlaying = this.playlistControlService.songPlaying;

    // Subscribes to observable streams
    this.playlistControlService.observables.playlist.subscribe(
      (playlist: Array<Song>) => {this.playlist = playlist; },
      this.ErrorEventHandler,
      () => {}
    );

    this.playlistControlService.observables.songPlaying.subscribe(
      songPlaying => {
        this.songPlaying = songPlaying;
      },
      this.ErrorEventHandler,
      () => {}
    );
  }

  togglePlaylistDisplay = () => {
    this._displayPlaylist = !this._displayPlaylist;
  }

  play = (song: Song) => {
    // if the song is not already in playlist then adds it to playlist
    if (typeof song.id === 'undefined') {
      console.log('the song is undefined');
      return;
    }
    this.playlistControlService.playSongNow(song);
  }

  pause = () => {
    this.playlistControlService.pause();
  }

  togglePause =()=> {
    this.playlistControlService.togglePause();
  };

  adjustVolume = (value) => {
    console.log(value);
    this.playlistControlService.setVolume(value);
  }

  toggleMute = () => {
    this.playlistControlService.toggleMute();
  }

  addSongToPlaylist = (song: Song) => {
    this.playlistControlService.addSongToPlaylist(song);
  }

  jumpToPosition = (decimal) => {
    this.playlistControlService.jumpToPosition(decimal);
  }

  removeSongFromPlaylist = () => {};

  private ErrorEventHandler = (error) => {console.log('an error occured :', error)}

  ngOnInit() {
  }

}
