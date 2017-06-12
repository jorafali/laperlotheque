import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EditSongControlService } from '../edit-song-control.service';
import { AuthService } from '../../../lib/authentication/auth.service';

@Component({
  selector: 'app-upload-audio-file',
  templateUrl: './upload-audio-file.component.html',
  styleUrls: ['./upload-audio-file.component.css']
})
export class UploadAudioFileComponent implements OnInit {

  @Input('forNewSong') forNewSong: boolean = true; 

	public audioFile: any;
	public audioFormValid: boolean = false;
  private _accountId: any;

  constructor(
    private authService: AuthService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private editSongControlService: EditSongControlService) {

    this.authService.observables.accountLoggedIn.subscribe(
      account=>{this._accountId = account.local.accountId})
  }

  public submitUpload(){
    // if there is a file to upload attached to this song edit control then upload it
    // create the song metadata first and then upload the file for it
    this.editSongControlService.audioFile = this.audioFile;
    this.editSongControlService.createSong(this._accountId)
      .switchMap((song)=>{
        return this.editSongControlService.uploadAudioFile()
      })
      .subscribe(success=> {
        if (!success) {
          return
        } 
        this.router.navigate([{outlets: {p: 'upload/edit'}}],{queryParams: {editSongId: success.id}});
      })
  }

  public cancelUpload() {
  	this.router.navigate(['']);
  }

  public onFileChange(fileToUpload: any){
	this.audioFile = fileToUpload.target.files[0];
	this.audioFormValid = true;
  }

  ngOnInit() {
    if (this.forNewSong){
      this.editSongControlService.initNewSongToEdit();
    }
  }

}
