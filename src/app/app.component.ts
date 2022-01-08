import { Component } from '@angular/core'
import { Auth } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router, RouterOutlet } from '@angular/router'
import { slider } from './route-animations'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slider],
})
export class AppComponent {
  loading = true

  get notLoggedInHeader(): boolean {
    return this.router.url === '/' ||
      this.router.url === '/login' ||
      this.router.url === '/register'
      ? true
      : false
  }

  constructor(private authService: AuthService, private router: Router) {
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
