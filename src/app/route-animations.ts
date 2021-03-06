import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'

export const slider = trigger('routeAnimations', [
  transition('isMiddle => isLeft', slideTo('left')),
  transition('isMiddle => isRight', slideTo('right')),
  transition('isRight => isMiddle', slideTo('left')),
  transition('isLeft => isMiddle', slideTo('right')),
  transition('isLeft => isRight', slideTo('left')),
  transition('isRight => isLeft', slideTo('right')),
  // transition('Dashboard => *', fade2()),
  transition('* <=> *', fade2()),
])

function slideTo(direction: any) {
  const optional = { optional: true }
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '100%' }))],
        optional
      ),
      query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))]),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ]
}

function fade() {
  const optional = { optional: true }
  return [
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          top: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      optional
    ),

    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: 0,
          width: '100%',
          opacity: 1,
        }),
      ],
      optional
    ),

    query(':enter', [animate('300ms ease-out', style({ opacity: 1 }))]),
    query(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
  ]
}
function fade2() {
  const optional = { optional: true }
  return [
    // query(
    //   ':enter',
    //   [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       width: '100%',
    //       opacity: 0,
    //     }),
    //   ],
    //   optional
    // ),

    // query(
    //   ':leave',
    //   [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       width: '100%',
    //       opacity: 1,
    //     }),
    //   ],
    //   optional
    // ),

    // query(
    //   ':leave',
    //   [
    //     style({ position: 'absolute', top: 0, width: '100%', opacity: 1 }),
    //     stagger('0', [animate('50ms ease-out', style({ opacity: 0 }))]),
    //   ],
    //   { optional: true }
    // ),

    query(
      ':enter',
      [
        style({ position: 'absolute', top: 0, width: '100%', opacity: 0 }),
        stagger(100, [animate('0.5s ease-out', style({ opacity: 1 }))]),
      ],
      { optional: true }
    ),
  ]
}
