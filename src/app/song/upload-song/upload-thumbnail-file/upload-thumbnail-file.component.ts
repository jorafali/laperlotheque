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

  constructor(
    private editSongControlService: EditSongControlService,
    private router: Router) { }

  public onFileChange(fileToUpload: any){
	this.editSongControlService.thumbnailFile = fileToUpload.target.files[0];
	this.thumbnailFormValid = true;
  this.editSongControlService.uploadThumbnailFile()
    .subscribe(success=> {
          if (!success) {
            return
          }
          this.router.navigate(['upload/edit'],{queryParams: {editSongId: success.id}});
        })
  }

  ngOnInit() {
  }

}
