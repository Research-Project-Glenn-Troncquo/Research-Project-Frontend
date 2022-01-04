import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  @Input() name: string = ''
  @Input() placeholder: string = ''
  @Input() type: string = ''
  @Input() formGroup: any
  constructor() {}

  ngOnInit(): void {}
}
