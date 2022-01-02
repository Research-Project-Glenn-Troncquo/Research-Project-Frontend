import { Location } from '@angular/common'
import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderComponent } from './header.component'

describe('AppHeaderComponent', () => {
  let component: HeaderComponent
  //fixture is the test environment for this component
  let fixture: ComponentFixture<HeaderComponent>
  let de: DebugElement
  let spy: jasmine.Spy

  beforeEach(async () => {
    // testbed is our testing environment
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    }).compileComponents() // compiles html and css
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have an h3 tag of `DrinkBuddy`', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('DrinkBuddy')
  })

  it('should have an anchor tag of `Log in`', () => {
    expect(de.queryAll(By.css('a'))[0].nativeElement.innerText).toBe('Log in')
  })

  it('should have an anchor tag of `Register`', () => {
    expect(de.queryAll(By.css('a'))[1].nativeElement.innerText).toBe('Register')
  })

  // it('login button should go to login page', () => {
  //   const location: Location = TestBed.inject(Location)

  //   expect(location.path()).toBe('')
  // })

  // it('onClick login should call method', () => {
  //   spy = spyOn<AppHeaderComponent, any>(component, 'handeLogin')
  //   let loginButton = de.nativeElement.querySelector('a')
  //   loginButton.click()

  //   fixture.whenStable().then(() => {
  //     expect(component.handeLogin).toHaveBeenCalled()
  //   })
  // })
})
