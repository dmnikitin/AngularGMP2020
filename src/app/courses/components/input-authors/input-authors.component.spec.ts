import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAuthorsComponent } from './input-authors.component';

describe('InputAuthorsComponent', () => {
  let component: InputAuthorsComponent;
  let fixture: ComponentFixture<InputAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAuthorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
