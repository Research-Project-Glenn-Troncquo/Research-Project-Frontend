import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LottieModule } from 'ngx-lottie'
import { playerFactory } from 'src/app/services/lottie.player.service'

import { LoadingComponent } from './loading.component'

describe('LoadingComponent', () => {
  let component: LoadingComponent
  let fixture: ComponentFixture<LoadingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LottieModule.forRoot({ player: playerFactory })],
      declarations: [LoadingComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
