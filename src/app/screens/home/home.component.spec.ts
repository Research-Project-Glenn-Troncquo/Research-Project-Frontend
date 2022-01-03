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
import { Location } from '@angular/common'

import { HomeComponent } from './home.component'
import { ComponentsModule } from 'src/app/components/components.module'

describe('HomeComponent', () => {
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
      imports: [RouterTestingModule.withRoutes(routes), ComponentsModule],
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

  it('should have the `app-header`', () => {
    expect(de.query(By.css('app-header')).nativeElement).toBeDefined()
  })

  it('should have the `app-footer`', () => {
    expect(de.query(By.css('app-footer')).nativeElement).toBeDefined()
  })

  it('should have an h3 tag of `DrinkBuddy`', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('DrinkBuddy')
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

  it('login button should go to login page', fakeAsync(() => {
    // spy = spyOn<HeaderComponent, any>(component, 'handleLogin')
    let loginButton = de.queryAll(By.css('button'))[0].nativeElement

    loginButton.click()
    tick()

    expect(location.path()).toBe('/login')
  }))

  it('register button should go to register page', fakeAsync(() => {
    // spy = spyOn<HeaderComponent, any>(component, 'handleLogin')
    let loginButton = de.queryAll(By.css('button'))[1].nativeElement

    loginButton.click()
    tick()

    expect(location.path()).toBe('/register')
  }))

  it('should contain an img with src `beer.png`', () => {
    expect(de.query(By.css('img')).nativeElement.src).toContain('beer.png')
  })
})
