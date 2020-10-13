import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseControlsComponent } from './course-controls.component';

describe('CourseControlsComponent', () => {
  let component: CourseControlsComponent;
  let fixture: ComponentFixture<CourseControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
