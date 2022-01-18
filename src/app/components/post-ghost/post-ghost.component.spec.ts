import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGhostComponent } from './post-ghost.component';

describe('PostGhostComponent', () => {
  let component: PostGhostComponent;
  let fixture: ComponentFixture<PostGhostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostGhostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
