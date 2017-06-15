import { trigger, state, animate, transition, style, query } from '@angular/animations';

export const FadeIn = 
trigger('fadeIn', [
  state('void', style({
    opacity: 0
  })),
  state('*', style({
    opacity: 1
  })),
  transition(':enter', [
    animate('.5s 0s ease')
  ])
])

export const FadeOut = 
trigger('fadeOut', [
  state('void', style({
    opacity: 0
  })),
  state('*', style({
    opacity: 1
  })),
  transition(':leave', [
    animate('.3s 0s ease')
  ])
])

export const SlideUpIn =
trigger('slideUpIn', [
  state('void', style({
    transform: 'translateY(100%)'
  })),
  state('*', style({
    transform: 'translateY(0%)'
  })),
  transition(':enter', [
    animate('.3s 0s ease')
  ])  
])

export const SlideUpOut =
trigger('slideUpOut', [
  state('void', style({
    transform: 'translateY(-100%)'
  })),
  state('*', style({
    transform: 'translateY(0%)'
  })),
  transition(':leave', [
    style({
      position: 'fixed'
    }),
    animate('.3s 0s ease')
  ])  
])

export const SlideDownOut = 
trigger('slideDownOut', [
  state('void', style({
    position: 'fixed',
    transform: 'translateY(100%)'
  })),
  state('*', style({
    transform: 'translateY(0%)'
  })),
  transition(':leave', [
      animate('.3s 0s ease')
    ])
])