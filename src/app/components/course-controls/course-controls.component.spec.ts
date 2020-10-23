import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CourseControlsComponent } from './course-controls.component';

describe('CourseControlsComponent', () => {
  let component: CourseControlsComponent;
  let fixture: ComponentFixture<CourseControlsComponent>;
  let debugElement: DebugElement;
  let mockData: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseControlsComponent ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseControlsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should log to console current input query on clicking the search button', ()=>{
    const buttonRef: ElementRef = debugElement.query(By.css('.search-button'));
    const inputRef: ElementRef = debugElement.query(By.css('input'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    const input: HTMLInputElement = inputRef.nativeElement as HTMLInputElement;
    mockData = 'mockInputData';
    input.value = mockData;
    input.dispatchEvent(new Event('input'));

    spyOn(console, 'log');
    fixture.detectChanges();
    button.click();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('query is: ', mockData);
  });
});
