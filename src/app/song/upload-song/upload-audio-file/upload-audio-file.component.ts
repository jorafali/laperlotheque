import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EditSongControlService } from '../edit-song-control.service';

@Component({
  selector: 'app-upload-audio-file',
  templateUrl: './upload-audio-file.component.html',
  styleUrls: ['./upload-audio-file.component.css']
})
export class UploadAudioFileComponent implements OnInit {

  @Input('forNewSong') forNewSong: boolean = true; 

	public audioFile: any;
	public audioFormValid: boolean = false;

  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
  	private editSongControlService: EditSongControlService) { }

  public submitUpload(){
    // if there is a file to upload attached to this song edit control then upload it
      this.editSongControlService.uploadAudioFile()
        .subscribe(success=> {
          if (!success) {
            return
          } 
          this.router.navigate(['upload/edit'],{queryParams: {editSongId: success.id}});
        })
  }

  public cancelUpload() {
  	this.router.navigate(['']);
  }

  public onFileChange(fileToUpload: any){
	this.editSongControlService.audioFile = fileToUpload.target.files[0];
	this.audioFormValid = true;
	console.log(fileToUpload);
  }

  ngOnInit() {
    if (this.forNewSong){
      this.editSongControlService.initNewSongToEdit();
    }
  }

}
