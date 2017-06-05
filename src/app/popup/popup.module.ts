import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';

import { PopupComponent } from './popup/popup.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  	PopupComponent
  	],
  exports: [
  	PopupComponent
  ]
})
export class PopupModule { }
