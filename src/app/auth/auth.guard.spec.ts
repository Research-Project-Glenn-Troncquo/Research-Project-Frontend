import { TestBed } from '@angular/core/testing'
import {
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router'

import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

describe('AuthGuard + AuthService', () => {
  const paramMap: ParamMap = {
    has(name: string): boolean {
      return true
    },
    get(): string | null {
      return null
    },

    getAll(): string[] {
      return []
    },
    keys: [],
  }

  const urlSegment: UrlSegment = {
    path: '',
    parameters: {},
    parameterMap: paramMap,
  }

  const dummyRoute = { url: [urlSegment] } as ActivatedRouteSnapshot
  const fakeUrls = ['/dashboard']
  let guard: AuthGuard
  let routerSpy: jasmine.SpyObj<Router>
  let serviceStub: Partial<AuthService>

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'])
    serviceStub = {}
    guard = new AuthGuard(serviceStub as AuthService, routerSpy)
  })

  function fakeRouterState(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot
  }

  describe('when the user is logged in', () => {
    beforeEach(() => {
      serviceStub.isLoggedIn = true
      guard.isFirstTime = false
    })
    fakeUrls.forEach((fakeUrl) => {
      it('should grant acces', () => {
        const isAccessGranted = guard.checkRoute(fakeUrl)

        expect(isAccessGranted).toBeTrue()
      })

      describe('should be able to activate route', () => {
        it('grants route access', () => {
          dummyRoute.url[0].path = fakeUrl
          const canActivate = guard.canActivate(
            dummyRoute,
            fakeRouterState(fakeUrl)
          )

          expect(canActivate).toBeTrue()
        })

        // it('grants child route access', () => {
        //   const canActivateChild = guard.canActivateChild(
        //     dummyRoute,
        //     fakeRouterState(fakeUrl)
        //   ) // [4]

        //   expect(canActivateChild).toBeTrue() // [4]
        // })

        // const paths = fakeUrl.split('/').filter((path) => path !== '') // [5]

        // paths.forEach((path) => {
        //   // [6]
        //   it('grants feature access', () => {
        //     const fakeRoute: Route = { path } // [6]
        //     const fakeUrlSegment = { path } as UrlSegment // [6]

        //     const canLoad = guard.canLoad(fakeRoute, [fakeUrlSegment]) // [7]

        //     expect(canLoad).toBeTrue() // [7]
        //   })
        // })
      })
    })
  })

  describe('when the user is logged out', () => {
    beforeEach(() => {
      serviceStub.isLoggedIn = false
      guard.isFirstTime = false
    })
    fakeUrls.forEach((fakeUrl) => {
      it('should not grant acces', () => {
        const isAccessGranted = guard.checkRoute(fakeUrl)

        expect(isAccessGranted).toBeUndefined()
      })

      describe('should not be able to activate route', () => {
        it('grants route access', () => {
          dummyRoute.url[0].path = fakeUrl
          const canActivate = guard.canActivate(
            dummyRoute,
            fakeRouterState(fakeUrl)
          )

          expect(canActivate).toBeUndefined()
        })
      })
    })
  })
})
