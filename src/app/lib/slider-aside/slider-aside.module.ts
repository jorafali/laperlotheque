import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AsideComponent
  ],
  declarations: [AsideComponent]
})
export class SliderAsideModule { }
