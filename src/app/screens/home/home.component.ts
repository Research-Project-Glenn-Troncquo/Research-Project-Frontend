import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AnimationOptions } from 'ngx-lottie'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  handleLogin() {
    this.router.navigateByUrl('login')
  }

  handleRegister() {
    this.router.navigateByUrl('register')
  }

  options: AnimationOptions = {
    path: './assets/drinking-man.json', // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  }
}
