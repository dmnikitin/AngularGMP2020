import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { CourseControlsComponent } from 'src/app/components/course-controls/course-controls.component';
import { CourseItemComponent } from 'src/app/components/course-item/course-item.component';
import { CoursesPageComponent } from './courses-page.component';
import { mockCourses } from 'src/assets/mock-data';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let debugElement: DebugElement;
  let mockData: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        CourseControlsComponent,
        CourseItemComponent,
        BreadcrumbsComponent
      ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onItemDelete method which was emitted by first delete button', ()=>{

    it ('should call onItemDelete method with correct ItemId ', ()=>{
      spyOn(component, 'onItemDelete');
      const button: ElementRef = debugElement.query(By.css('.delete'));
      (button.nativeElement as HTMLButtonElement).click();
      mockData = mockCourses[0].id;

      expect(component.onItemDelete).toHaveBeenCalledTimes(1);
      expect(component.onItemDelete).toHaveBeenCalledWith(mockData);
    });

    it('should log ItemId in console', () => {
      const button: ElementRef = debugElement.query(By.css('.delete'));
      (button.nativeElement as HTMLButtonElement).click();
      mockData = mockCourses[0].id;

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('item Id: ', mockData);
    });
  });

  it('should log a "load more" string to console when LoadMore button is clicked', () => {

    const button: ElementRef = debugElement.query(By.css('.load-more'));
    (button.nativeElement as HTMLButtonElement).click();
    mockData = 'load more';

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(mockData);
  });
});
