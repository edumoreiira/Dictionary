import { transition, trigger, query, animateChild, animate, state, style } from "@angular/animations";

export const parentAnimation = trigger('parentAnimation', [
    transition(':enter, :leave', [
        query('@animateElement', animateChild(), { optional: true })
    ])
]);

export const elementAnimation = trigger('animateElement', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        style({
            transform: 'translateY(30px)'
        }),
        animate('400ms ease-out')
    ]),
    transition(':leave', [
        animate('200ms ease-in')
    ])
]);

export const popUpAnimation = trigger('popUp', [
  state('void', style({
    width: 0,
    opacity: 0,
    marginLeft: '-2px',
    paddingInline: 0  // Use padding-inline para o estado inicial
  })),
  transition(':enter', [
    style({ paddingLeft: 0, paddingRight: 0 }),  // Defina padding-left e padding-right no início da transição
    animate('300ms ease-in-out', style({
      width: '*',
      opacity: 1,
      marginLeft: '*',
      paddingLeft: '*',
      paddingRight: '*'
    }))
  ]),
  transition(':leave', [
    animate('300ms ease-in-out', style({
      width: 0,
      opacity: 0,
      marginLeft: '-2px',
      paddingLeft: 0,
      paddingRight: 0
    }))
  ])
]);