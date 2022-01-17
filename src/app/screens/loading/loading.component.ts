import { Component, Input, OnInit } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean = true

  constructor() {}

  ngOnInit(): void {}

  options: AnimationOptions = {
    path: './assets/beer-loading.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  }
}
