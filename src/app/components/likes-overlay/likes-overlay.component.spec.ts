import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesOverlayComponent } from './likes-overlay.component';

describe('LikesOverlayComponent', () => {
  let component: LikesOverlayComponent;
  let fixture: ComponentFixture<LikesOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikesOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
