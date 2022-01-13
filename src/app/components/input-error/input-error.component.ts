import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  animations: [
    trigger('fadeTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),

    trigger('slideInTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          '300ms ease-out',
          style({ opacity: 0, transform: 'translateX(-30px)' })
        ),
      ]),
    ]),
  ],
})
export class InputErrorComponent implements OnInit {
  @Input() errorMsg: string = ''
  @Input() show: boolean = false
  @Input() errorName: string = ''
  @Output() emitClickEvent = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.emitClickEvent.emit(this.errorName)
  }
}
