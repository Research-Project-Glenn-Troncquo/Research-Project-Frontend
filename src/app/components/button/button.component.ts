import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ButtonComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() name: string = ''
  @Input() type: string = ''
  @Input() loading: boolean = false
  @Output() buttonClickEvent = new EventEmitter()

  handleClick() {
    this.buttonClickEvent.emit()
  }
}
