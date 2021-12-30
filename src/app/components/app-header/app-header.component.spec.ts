import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { AppHeaderComponent } from './app-header.component'

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent
  //fixture is the test environment for this component
  let fixture: ComponentFixture<AppHeaderComponent>
  let de: DebugElement

  beforeEach(async () => {
    // testbed is our testing environment
    await TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
    }).compileComponents() // compiles html and css
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have an h3 tag of `Log in`', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('Log in')
  })

  it('should have a button tag of `Log in`', () => {
    expect(de.query(By.css('button')).nativeElement.innerText).toBe('Log in')
  })

  it('should have a button tag of `Register`', () => {
    expect(de.query(By.css('button')).nativeElement.innerText).toBe('Register')
  })
})
