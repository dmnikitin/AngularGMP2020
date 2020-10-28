import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { CourseControlsComponent } from 'src/app/components/course-controls/course-controls.component';
import { CourseItemComponent } from 'src/app/components/course-item/course-item.component';
import { CoursesPageComponent } from './courses-page.component';
import { BorderDirective } from 'src/app/directives/border.directive';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { mockCourses } from 'src/assets/mock-data';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let debugElement: DebugElement;
  let childDebugElement: DebugElement;
  let mockData: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        CourseControlsComponent,
        CourseItemComponent,
        BreadcrumbsComponent,
        DurationPipe,
        OrderByPipe,
        BorderDirective
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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should log a "load more" string to console when LoadMore button is clicked', () => {
    const buttonRef: ElementRef = debugElement.query(By.css('.load-more'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();
    mockData = 'load more';

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(mockData);
  });

  describe('onItemDelete method (called when delete item button is clicked)', ()=>{
    let buttonRef: ElementRef;
    let button: HTMLButtonElement;

    beforeEach(()=>{
      // gets the delete button rendered in first CourseItemComponent
      buttonRef = debugElement.query(By.css('.delete'));
      button = buttonRef.nativeElement as HTMLButtonElement;
      mockData = mockCourses[0].id;
    });

    it ('should call onItemDelete method with correct ItemId ', ()=>{
      spyOn(component, 'onItemDelete');
      button.click();

      expect(component.onItemDelete).toHaveBeenCalledTimes(1);
      expect(component.onItemDelete).toHaveBeenCalledWith(mockData);
    });

    it('should log ItemId in console', () => {
      button.click();

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('item Id: ', mockData);
    });
  });

  describe('interactions with course-controls component', () => {

    beforeEach(() => {
      childDebugElement = fixture.debugElement.query(By.directive(CourseControlsComponent));
    });

    it('should sort courses list by creation date with provided boolean value', () => {
      const buttonRef: ElementRef = debugElement.query(By.css('.sorting-button'));
      const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
      spyOn(component, 'onItemsSort').and.callThrough();
      (childDebugElement.context as CourseControlsComponent).isAscending = false;
      button.click();
      fixture.detectChanges();

      expect(component.onItemsSort).toHaveBeenCalledTimes(1);
      expect(component.onItemsSort).toHaveBeenCalledWith(false);
      expect(component.coursesToBeDisplayed[0].id).toEqual('003');
    });

    it('should filter courses list with provided filtering value', () => {
      const buttonRef: ElementRef = debugElement.query(By.css('.search-button'));
      const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
      spyOn(component, 'onItemsSearch').and.callThrough();
      (childDebugElement.context as CourseControlsComponent).searchQuery = '2';
      button.click();
      fixture.detectChanges();

      expect(component.onItemsSearch).toHaveBeenCalledTimes(1);
      expect(component.onItemsSearch).toHaveBeenCalledWith('2');
      expect(component.coursesToBeDisplayed[0].id).toEqual('002');
    });
  });
});
