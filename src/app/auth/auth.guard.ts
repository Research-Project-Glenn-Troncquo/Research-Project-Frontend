import { EventEmitter, Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AppComponent } from '../app.component'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isFirstTime: boolean = true

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isFirstTime) {
      return new Promise((resolve, reject) => {
        this.isFirstTime = false
        this.authService.restoreAuth().then(() => {
          console.log('auth completed guard')
          return this.authService.isLoggedIn ? resolve(true) : resolve(false)
        })
      })
    }

    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['login'])
    }

    return true
  }
}
