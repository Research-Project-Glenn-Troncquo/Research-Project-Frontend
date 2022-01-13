import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
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
