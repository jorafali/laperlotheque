import { Component, OnInit } from '@angular/core';
import { EditSongControlService } from './edit-song-control.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent implements OnInit {

  constructor(private editSongControlService: EditSongControlService) { }

  ngOnInit() {
  	this.editSongControlService.initNewSongToEdit();
  }

}
