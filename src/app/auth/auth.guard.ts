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
  promiseResolve?: any
  promiseReject?: any

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let path: string

    try {
      path = route.url[0].path
    } catch (error) {
      path = ''
    }

    if (this.isFirstTime) {
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
        this.isFirstTime = false

        this.authService.restoreAuth().then(() => {
          this.authService.onLoadingState.emit(false)
          resolve(this.checkRoute(path))
        })
      })
    }

    return this.checkRoute(path)
  }

  checkRoute(route: string) {
    if (route === '' || route === 'login' || route === 'register') {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['/dashboard'])
        return false
      }

      return true
    }

    if (this.authService.isLoggedIn) {
      return true
    }
    this.router.navigate(['/'])
    return false
  }
}
