import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3HexbinPipe } from './d3-hexbin.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  	D3HexbinPipe
  ],
  declarations: [
  	D3HexbinPipe
  ]
})
export class LayoutModule { }
