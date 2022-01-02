import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() name = ''
  @Output() buttonClickEvent = new EventEmitter()

  handleClick() {
    this.buttonClickEvent.emit()
  }
}
