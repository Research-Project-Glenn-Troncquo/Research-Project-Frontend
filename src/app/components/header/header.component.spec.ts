import { Location } from '@angular/common'
import { DebugElement } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { routes } from 'src/app/app-routing.module'
import { HeaderComponent } from './header.component'

describe('AppHeaderComponent', () => {
  let component: HeaderComponent
  //fixture is the test environment for this component
  let fixture: ComponentFixture<HeaderComponent>
  let de: DebugElement
  let spy: jasmine.Spy
  let location: Location
  let router: Router

  beforeEach(async () => {
    // testbed is our testing environment
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents() // compiles html and css
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    router.initialNavigation()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have an h3 tag of `DrinkBuddy`', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('DrinkBuddy')
  })

  it('should have an anchor tag of `Home`', () => {
    expect(de.queryAll(By.css('a'))[0].nativeElement.innerText).toBe('Home')
  })

  it('should have an anchor tag of `Log in`', () => {
    expect(de.queryAll(By.css('a'))[1].nativeElement.innerText).toBe('Log in')
  })

  it('should have an anchor tag of `Register`', () => {
    expect(de.queryAll(By.css('a'))[2].nativeElement.innerText).toBe('Register')
  })

  it('home button should go to home page', fakeAsync(() => {
    // spy = spyOn<HeaderComponent, any>(component, 'handleLogin')
    let loginButton = de.queryAll(By.css('a'))[0].nativeElement

    loginButton.click()
    tick()

    expect(location.path()).toBe('/')
  }))

  it('login button should go to login page', fakeAsync(() => {
    // spy = spyOn<HeaderComponent, any>(component, 'handleLogin')
    let loginButton = de.queryAll(By.css('a'))[1].nativeElement

    loginButton.click()
    tick()

    expect(location.path()).toBe('/login')
  }))

  it('register button should go to register page', fakeAsync(() => {
    let registerButton = de.queryAll(By.css('a'))[2].nativeElement

    registerButton.click()
    tick()

    expect(location.path()).toBe('/register')
  }))
})
