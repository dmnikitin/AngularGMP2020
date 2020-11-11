import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../../pipes/duration.pipe';

import { InputDurationComponent } from './input-duration.component';

describe('InputDurationComponent', () => {
  let component: InputDurationComponent;
  let fixture: ComponentFixture<InputDurationComponent>;
  let debugElement: DebugElement;
  let mockData: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDurationComponent, DurationPipe ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDurationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit string to the parent component when onDurationChange method is called', () => {
    spyOn(component.durationChange, 'emit');
    const inputRef: ElementRef = debugElement.query(By.css('.input'));
    const input: HTMLInputElement = inputRef.nativeElement as HTMLInputElement;
    mockData = '5';
    input.value = mockData;
    input.dispatchEvent(new Event('input'));

    expect(component.durationChange.emit).toHaveBeenCalledWith(mockData);
  });
});
