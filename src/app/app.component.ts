import { Component } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router, RouterOutlet } from '@angular/router'
import { slider } from './route-animations'
import { AuthService } from './auth/firebase.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slider],
})
export class AppComponent {
  searchPage: boolean = false
  loading = true

  get notLoggedInHeader(): boolean {
    return this.router.url === '/' ||
      this.router.url === '/login' ||
      this.router.url === '/register' ||
      this.router.url === '/forgotpassword'
      ? true
      : false
  }

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((val) => {
      this.router.url === '/search'
        ? (this.searchPage = true)
        : (this.searchPage = false)
    })
    this.authService.onLoadingState.subscribe((loadingState) => {
      this.loading = loadingState
      this.authService.onLoadingState.unsubscribe()
    })
  }
  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }
}
