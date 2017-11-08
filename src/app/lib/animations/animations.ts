import { animation, trigger, state, animate, transition, style, query } from '@angular/animations';

export const FadeAnimation = animation([
  style({
    opacity: '{{ from }}'
  }), animate('{{ time + method }}', style({
    opacity: '{{ to }}'
  }))
], {params : {time: '.3s', method: 'ease'}});

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
]);

export const FadeOut =
trigger('fadeOut', [
  state('void', style({
    opacity: 0
  })),
  state('fadeOut', style({
    opacity: 0
  })),
  state('*', style({
    opacity: 1
  })),
  transition(':leave', [
    animate('.3s 0s ease')
  ]),
  transition('* => fadeOut',
    animate('1s 0s ease'))
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
]);

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
]);


export const SlideLeftIn =
trigger('slideLeftIn', [
  state('void', style({
    display: 'block',
    transform: 'translateX(100%)',
    position: 'fixed',
    right: '0px'
  })),
  state('*', style({
    display: 'block',
    transform: 'translateX(0)',
    position: 'fixed',
    right: '0px'
  })),
  transition(':enter', [
    animate('.3s 0s ease')
  ])
]);

export const SlideRightOut =
trigger('slideRightOut', [
  state('*', style({
    display: 'block',
    transform: 'translateX(0)',
    position: 'fixed',
    right: '0px'
  })),
  state('void', style({
    display: 'block',
    transform: 'translateX(100%)',
    position: 'fixed',
    right: '0px'
  })),
  state('rightOut', style({
    display: 'block',
    transform: 'translateX(100%)',
    position: 'fixed',
    right: '0px'
  })),
  transition('* => void', [
    animate('.3s 0s ease')
  ]),
  transition( '* => rightOut', [
    animate('.3s 0s ease')
  ])
]);

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