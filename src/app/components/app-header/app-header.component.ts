import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent implements OnInit {
  constructor() {}

  test = 'Hello World'

  ngOnInit(): void {}
}
