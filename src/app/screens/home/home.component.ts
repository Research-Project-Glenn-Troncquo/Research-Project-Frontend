import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    console.log('home component is called')
  }

  handleLogin() {
    this.router.navigateByUrl('login')
  }

  handleRegister() {
    this.router.navigateByUrl('register')
  }
}
