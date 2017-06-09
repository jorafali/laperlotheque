import { Component, OnInit, OnChanges } from '@angular/core';
import { PlayerService } from '../lib/soundplayer/player.service';
import { PlaylistControlService } from '../lib/soundplayer/playlist-control.service';
import { Song } from '../song/song';

@Component({
  selector: '[app-soundplayer]',
  templateUrl: './soundplayer.component.html',
  styleUrls: ['./soundplayer.component.css']
})
export class SoundplayerComponent implements OnInit, OnChanges {

	public playlist: Array<Song>;
  public songPlaying: any;

  // THIS CONSTRUCTOR registers observers on the playlist-control published streams
  /*
  By observing to the playlist-control service streams, this player doesn't care where the instructions are coming from
  It just acts upon receiving streamed events
  */
  constructor(private playlistControlService: PlaylistControlService) {
    this.playlist = this.playlistControlService.playlist as Array<Song>;
    this.songPlaying = this.playlistControlService.songPlaying;

    // Subscribes to observable streams 
    this.playlistControlService.observables.playlist.subscribe(
      (playlist: Array<Song>) => {this.playlist = playlist},
      this.ErrorEventHandler,
      () => {}
    );

    this.playlistControlService.observables.songPlaying.subscribe(
      songPlaying => {
        this.songPlaying = songPlaying
      },
      this.ErrorEventHandler,
      () => {}
    )
  }

  play = (song: Song) => {
    // if the song is not already in playlist then adds it to playlist
    if (typeof song.id === 'undefined') {
      console.log('the song is undefined');
      return
    }
  	this.playlistControlService.playSongNow(song);
  };

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
  };

  jumpToPosition = (e) => {
    let jumpToPercentage = e.offsetX / e.target.clientWidth;
    this.playlistControlService.jumpToPosition(jumpToPercentage);
  };

  removeSongFromPlaylist = () => {};

  private ErrorEventHandler = (error) => {console.log('an error occured :', error)}

  ngOnInit() {

  }

  ngOnChanges(changes){
    console.log(changes)
  }

}
