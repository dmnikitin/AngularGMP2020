import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputAuthorsComponent } from './input-authors.component';
import { By } from '@angular/platform-browser';

describe('InputAuthorsComponent', () => {
  let component: InputAuthorsComponent;
  let fixture: ComponentFixture<InputAuthorsComponent>;
  let debugElement: DebugElement;
  let mockData: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAuthorsComponent ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAuthorsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit string to the parent component when onAuthorsChange method is called', () => {
    spyOn(component.authorsChange, 'emit');
    const inputRef: ElementRef = debugElement.query(By.css('.input'));
    const input: HTMLInputElement = inputRef.nativeElement as HTMLInputElement;
    mockData = 'mockInputData';
    input.value = mockData;
    input.dispatchEvent(new Event('input'));

    expect(component.authorsChange.emit).toHaveBeenCalledWith(mockData);
  });
});
