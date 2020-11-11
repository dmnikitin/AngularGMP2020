import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  CourseControlsComponent
} from 'src/app/courses/components/course-controls/course-controls.component';
import { CourseItemComponent } from 'src/app/courses/components/course-item/course-item.component';
import { CoursesPageComponent } from './courses-page.component';
import { BorderDirective } from 'src/app/courses/directives/border.directive';
import { DurationPipe } from 'src/app/courses/pipes/duration.pipe';
import { OrderByPipe } from 'src/app/courses/pipes/order-by.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {  MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Observable, of } from 'rxjs';

type DialogRefStubFunc = { afterClosed: () => Observable<boolean> };
type DialogStubFunc = { open: () => DialogRefStubFunc };

const dialogRefStub: DialogRefStubFunc = {
  afterClosed: () => of(true)
};
const dialogStub: DialogStubFunc= { open: () => dialogRefStub };

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
        DurationPipe,
        OrderByPipe,
        BorderDirective
      ],
      imports: [ FormsModule, SharedModule, RouterTestingModule, NoopAnimationsModule, MatDialogModule ],
      providers: [CoursesService, { provide: MatDialog, useValue: dialogStub }],
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

  afterEach(()=>{
    dialogRefStub.afterClosed = () => of(true);
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

  it('should delete a specified course when onItemDelete method is called', () => {
    mockData = '002';
    component.onItemDelete(mockData);
    fixture.detectChanges();

    expect(component.courses.length).toEqual(2);
  });

  it('should not update the deletedItem property if Delete button in dialog was not clicked', () => {
    dialogRefStub.afterClosed = () => of(false);
    mockData = '002';
    component.onItemDelete(mockData);

    expect(component.courses.length).toEqual(3);
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
      expect(component.courses[0].id).toEqual('003');
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
      expect(component.courses[0].id).toEqual('002');
    });
  });
});
