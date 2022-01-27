import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { routes } from 'src/app/app-routing.module'
import { Location } from '@angular/common'

import { HomeComponent } from './home.component'
import { ComponentsModule } from 'src/app/components/components.module'
import { AuthGuard } from 'src/app/auth/auth.guard'
import { AuthService } from 'src/app/auth/firebase.service'
import { LottieModule } from 'ngx-lottie'
import { playerFactory } from 'src/app/services/lottie.player.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('Home Component', () => {
  let component: HomeComponent
  //fixture is the test environment for this component
  let fixture: ComponentFixture<HomeComponent>
  let de: DebugElement
  let spy: jasmine.Spy
  let location: Location
  let router: Router

  beforeEach(async () => {
    // testbed is our testing environment
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        ComponentsModule,
        BrowserAnimationsModule,
        LottieModule.forRoot({ player: playerFactory }),
      ],
    }).compileComponents() // compiles html and css
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    // router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    // router.initialNavigation()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the `app-footer`', () => {
    expect(de.query(By.css('app-footer')).nativeElement).toBeDefined()
  })

  it('should have an h3 tag of `DrinkBuddy`', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('Drink')
    expect(de.queryAll(By.css('h3'))[1].nativeElement.innerText).toBe('Buddy')
  })

  it('should have a p tag with `DrinkBuddy is the #1...`', () => {
    expect(de.query(By.css('p')).nativeElement.innerText).toBe(
      'Drink Buddy is a social app where you can share your drinks with your friends.'
    )
  })

  it('should have a button of `Log in`', () => {
    expect(de.queryAll(By.css('button'))[0].nativeElement.innerText).toBe(
      'Log in'
    )
  })

  it('should have a button of `Register`', () => {
    expect(de.queryAll(By.css('button'))[1].nativeElement.innerText).toBe(
      'Register'
    )
  })

  describe('Integration with Auth Service + Auth Guard', () => {
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
    const fakeUrl = 'login'
    let guard: AuthGuard
    let routerSpy: jasmine.SpyObj<Router>
    let serviceStub: Partial<AuthService>

    function fakeRouterState(url: string): RouterStateSnapshot {
      return {
        url,
      } as RouterStateSnapshot
    }

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'])
      serviceStub = {}
      guard = new AuthGuard(serviceStub as AuthService, routerSpy)
      guard.isFirstTime = false
      serviceStub.isLoggedIn = false
    })

    it('login button click should go to login page when the user is logged out', () => {
      spy = spyOn<HomeComponent, any>(component, 'handleLogin')
      let loginButton = de.queryAll(By.css('button'))[0]

      loginButton.triggerEventHandler('click', null)

      expect(spy).toHaveBeenCalled()

      const isAccessGranted = guard.checkRoute(fakeUrl)

      expect(isAccessGranted).toBeTrue()

      dummyRoute.url[0].path = fakeUrl
      const canActivate = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl)
      )

      expect(canActivate).toBeTrue()
    })

    it('register button click should go to register page when the user is logged out', () => {
      spy = spyOn<HomeComponent, any>(component, 'handleRegister')
      let registerButton = de.queryAll(By.css('button'))[1]

      registerButton.triggerEventHandler('click', null)

      expect(spy).toHaveBeenCalled()

      const isAccessGranted = guard.checkRoute(fakeUrl)

      expect(isAccessGranted).toBeTrue()

      dummyRoute.url[0].path = fakeUrl
      const canActivate = guard.canActivate(
        dummyRoute,
        fakeRouterState(fakeUrl)
      )

      expect(canActivate).toBeFalse()
    })
  })
})
