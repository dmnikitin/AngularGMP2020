import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log to console current input query on clicking the search button', ()=>{
    spyOn(console, 'log');
    mockData = 'mockInputData';

    const hostElement: HTMLInputElement = fixture.nativeElement as HTMLInputElement;
    const input: HTMLInputElement = hostElement.querySelector('input');
    const button: ElementRef = debugElement.query(By.css('.search-button'));
    input.value = mockData;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (button.nativeElement as HTMLButtonElement).click();

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('query is: ', mockData);
  });
});
