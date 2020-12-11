import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CoursesService } from 'src/app/core/services/courses.service';
import { CourseControlsComponent } from './course-controls.component';

describe('CourseControlsComponent', () => {
  let component: CourseControlsComponent;
  let fixture: ComponentFixture<CourseControlsComponent>;
  let debugElement: DebugElement;
  let mockData: string;
  let coursesService: CoursesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseControlsComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [ CoursesService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseControlsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    coursesService = TestBed.inject(CoursesService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchQuery string to the parent component when searchItems method is called', () => {
    spyOn(component, 'updateQuery');
    spyOn(coursesService.searchQuery, 'next');
    const inputRef: ElementRef = debugElement.query(By.css('input'));
    const input: HTMLInputElement = inputRef.nativeElement as HTMLInputElement;
    mockData = 'mockInputData';
    input.value = mockData;
    input.dispatchEvent(new Event('keyup'));

    expect(component.updateQuery).toHaveBeenCalledWith(mockData);
    // expect(coursesService.searchQuery.next).toHaveBeenCalledWith(mockData);
  });

  it('should emit sorting string to the parent component when sortItemsByDate method is called', () => {
    const buttonRef: ElementRef = debugElement.query(By.css('.sorting-button'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    spyOn(component.sortEvent, 'emit');
    button.click();

    expect(component.sortEvent.emit).toHaveBeenCalledWith('date');
  });
});
