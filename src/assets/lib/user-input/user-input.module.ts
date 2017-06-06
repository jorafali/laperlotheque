import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { SliderBarDirective } from './slider/slider-bar.directive';
import { SliderProgressDirective } from './slider/slider-progress.directive';
import { SliderCursorDirective } from './slider/slider-cursor.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  SliderComponent,
  SliderBarDirective, 
	SliderProgressDirective, 
	SliderCursorDirective
  ],
  declarations: [
  	SliderComponent, 
  	SliderBarDirective, 
  	SliderProgressDirective, 
  	SliderCursorDirective]
})
export class UserInputModule { }
