import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EditSongControlService } from '../edit-song-control.service';

@Component({
  selector: 'app-upload-audio-file',
  templateUrl: './upload-audio-file.component.html',
  styleUrls: ['./upload-audio-file.component.css']
})
export class UploadAudioFileComponent implements OnInit, OnDestroy {

  private _isTrackFile: number;
  set audioLink(val: string){
    this.editSongControlService.trackUrl = val;
  };
  get audioLink(){
    return this.editSongControlService.trackUrl;
  };

	public audioFile: any;

  constructor(
  	private editSongControlService: EditSongControlService) {
  }

  public onFileChange(fileToUpload: any){
	this.editSongControlService.audioFile = fileToUpload.target.files[0];
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
