import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { EditSongControlService } from '../edit-song-control.service';

@Component({
  selector: 'app-upload-thumbnail-file',
  templateUrl: './upload-thumbnail-file.component.html',
  styleUrls: ['./upload-thumbnail-file.component.css']
})
export class UploadThumbnailFileComponent implements OnInit {

	public thumbnailFormValid: boolean = false;
  private reader: FileReader = new FileReader();

  constructor(
    private editSongControlService: EditSongControlService,
    private router: Router) {

    this.reader.onload = (event: any)=>{
      this.editSongControlService.thumbnailClientFileBuffer = event.target.result;
    }
  }

  public onFileChange(fileToUpload: any){
    this.reader.readAsDataURL(fileToUpload.target.files[0]);
  	this.editSongControlService.thumbnailFile = fileToUpload.target.files[0];
  	this.thumbnailFormValid = true;
  }

  ngOnInit() {
  }

}
