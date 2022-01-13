import { DebugElement, EventEmitter, Injectable } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  ActivatedRouteSnapshot,
  ParamMap,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Auth } from 'firebase/auth'
import { AppRoutingModule, routes } from 'src/app/app-routing.module'
import { AuthGuard } from 'src/app/auth/auth.guard'
import { AuthService } from 'src/app/auth/firebase.service'
import { ComponentsModule } from 'src/app/components/components.module'
import { HttpService } from 'src/app/http/http.service'
import { User } from 'src/app/interface/user'
import { Location } from '@angular/common'

import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let de: DebugElement
  let fixture: ComponentFixture<LoginComponent>
  let spy: jasmine.Spy
  let authServiceStub: Partial<AuthService>
  let guard: AuthGuard
  let fakeService: FakeAuthService
  let location: Location
  let routerSpy: jasmine.SpyObj<Router>

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

  const route = { url: [urlSegment] } as ActivatedRouteSnapshot
  function fakeRouterState(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [{ provide: AuthService, useClass: FakeAuthService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    de = fixture.debugElement

    fakeService = TestBed.inject(AuthService)

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'])
    authServiceStub = {}
    guard = new AuthGuard(authServiceStub as AuthService, routerSpy)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have an h3 tag of `Log in`', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('Log in')
  })

  describe('should have a close button', () => {
    it('', () => {
      expect(de.query(By.css('.close')).nativeElement.innerText).toBeDefined()
    })
  })

  describe('should have a div with Log in with Google', () => {
    it('', () => {
      expect(de.queryAll(By.css('div'))[3].nativeElement.innerText).toBe(
        'Log in with Google'
      )
    })

    // it('onClick call google login function', () => {})
  })

  it('should have a label tag of `Email` and an input', () => {
    expect(
      de.query(By.css('label[for=email-input]')).nativeElement.innerText
    ).toBe('Email')

    expect(de.queryAll(By.css('input'))[0].nativeElement).toBeDefined()
  })

  it('should have a label tag of `Password` and an input', () => {
    expect(
      de.query(By.css('label[for=password-input]')).nativeElement.innerText
    ).toBe('Password')
    expect(de.queryAll(By.css('input'))[1].nativeElement).toBeDefined()
  })

  describe('Email', () => {
    it('should show error message after blur `Please fill in an email`', () => {
      const emailInput: HTMLInputElement = de.queryAll(By.css('input'))[0]
        .nativeElement

      const emailLabel = de.query(
        By.css('label[for=email-input]')
      ).nativeElement

      const passwordLabel = de.query(
        By.css('label[for=password-input]')
      ).nativeElement

      emailLabel.click()
      passwordLabel.click()
      // emailInput.value = ''
      // emailInput.dispatchEvent(new Event('input'))
      // component.validateAllFormFields()
      fixture.detectChanges()

      expect(
        de.queryAll(By.css('app-input-error'))[0].nativeElement.innerText
      ).toContain('Please fill in an email')

      // fixture.whenStable().then(() => {})
    })

    it('should show error message after empty input `Please fill in an email`', () => {
      const emailInput: HTMLInputElement = de.queryAll(By.css('input'))[0]
        .nativeElement

      emailInput.value = ''
      emailInput.dispatchEvent(new Event('input'))
      fixture.detectChanges()

      expect(
        de.queryAll(By.css('app-input-error'))[0].nativeElement.innerText
      ).toContain('Please fill in an email')
    })
  })

  describe('Password', () => {
    it('should show error message after blur `Please fill in a password`', () => {
      const passwordInput: HTMLInputElement = de.queryAll(By.css('input'))[1]
        .nativeElement

      const emailLabel = de.query(
        By.css('label[for=email-input]')
      ).nativeElement

      const passwordLabel = de.query(
        By.css('label[for=password-input]')
      ).nativeElement

      passwordLabel.click()
      emailLabel.click()

      fixture.detectChanges()

      expect(
        de.queryAll(By.css('app-input-error'))[1].nativeElement.innerText
      ).toContain('Please fill in a password')

      // fixture.whenStable().then(() => {})
    })

    it('should show error message after empty input `Please fill in a password`', () => {
      const passwordInput: HTMLInputElement = de.queryAll(By.css('input'))[1]
        .nativeElement

      passwordInput.value = ''
      passwordInput.dispatchEvent(new Event('input'))
      fixture.detectChanges()

      expect(
        de.queryAll(By.css('app-input-error'))[1].nativeElement.innerText
      ).toContain('Please fill in a password')
    })
  })

  it('should have a p tag `Dont have an account yet?`', () => {
    expect(de.queryAll(By.css('p'))[2].nativeElement.innerText).toBe(
      `Don't have an account yet?`
    )
  })

  describe('should have an anchor tag `Sign up`', () => {
    beforeEach(() => {
      authServiceStub.isLoggedIn = false
      guard.isFirstTime = false
    })
    it('', () => {
      expect(de.queryAll(By.css('p'))[3].nativeElement.innerText).toBe(
        `Sign up`
      )
    })
    it('onClick should go to the register page', () => {
      spy = spyOn<LoginComponent, any>(component, 'handleRoute')

      const signUpButton = de.queryAll(By.css('p'))[3].nativeElement

      signUpButton.click()

      expect(spy).toHaveBeenCalled()

      route.url[0].path = 'register'
      const canActivate = guard.canActivate(route, fakeRouterState('register'))

      expect(canActivate).toBeTrue()
    })
  })

  describe('should have a button `Log in`', () => {
    it('', () => {
      expect(de.query(By.css('app-button')).nativeElement).toBeDefined()
      expect(de.query(By.css('app-button')).nativeElement.innerText).toBe(
        'Log in'
      )
    })
    it('should show error if an input is empty', () => {
      spy = spyOn<LoginComponent, any>(component, 'onSubmit')
      const loginButton = de.query(By.css('app-button')).nativeElement
      const emailInput: HTMLInputElement = de.queryAll(By.css('input'))[0]
        .nativeElement
      const passwordInput: HTMLInputElement = de.queryAll(By.css('input'))[1]
        .nativeElement

      //set the values empty
      emailInput.value = ''
      passwordInput.value = ''
      emailInput.dispatchEvent(new Event('input'))
      passwordInput.dispatchEvent(new Event('input'))

      //check te values after submit
      loginButton.click()
      fixture.detectChanges()

      expect(spy).toHaveBeenCalled()
      expect(
        de.queryAll(By.css('app-input-error'))[0].nativeElement.innerText
      ).toContain('Please fill in an email')
      expect(
        de.queryAll(By.css('app-input-error'))[1].nativeElement.innerText
      ).toContain('Please fill in a password')
    })
  })
})

@Injectable()
class FakeAuthService implements AuthService {
  app: any = ''
  user: any
  onLoadingState = new EventEmitter()
  public _isLoggedIn: boolean

  constructor() {
    this._isLoggedIn =
      this.user === null || this.user === undefined ? false : true
  }

  get isLoggedIn(): boolean {
    return true
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn =
      this.user === null || this.user === undefined ? false : true
    value ? (this._isLoggedIn = value) : null
  }
  async restoreAuth(): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true))
  }

  async login(email: string, password: string): Promise<boolean> {
    this.isLoggedIn = true
    return new Promise((resolve, reject) => resolve(true))
  }

  async register(user: User) {}

  async loginId(id: string): Promise<boolean> {
    return true
  }

  signOut(): any {
    this.user = null
  }

  fileUpload(file: any): Promise<string> {
    return new Promise((resolve) => resolve('true'))
  }

  getUser(): Promise<any> {
    return new Promise((resolve) => resolve(true))
  }
}
