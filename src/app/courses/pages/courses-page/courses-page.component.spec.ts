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
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {  MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Observable, of } from 'rxjs';
import { mockCourses } from 'src/assets/mock-data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DurationPipe } from '../../pipes/duration.pipe';

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
  let coursesService: CoursesService;
  let mockNumber: number;
  let mockString: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        CourseControlsComponent,
        CourseItemComponent,
        BorderDirective,
        DurationPipe
      ],
      imports: [
        FormsModule,
        SharedModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [CoursesService, { provide: MatDialog, useValue: dialogStub }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    coursesService = TestBed.inject(CoursesService);
    fixture.detectChanges();
    spyOn(coursesService, 'getList').and.returnValue(of(mockCourses));
    spyOn(coursesService, 'removeItem').and.returnValue(of(mockCourses[1]));
  });

  afterEach(()=>{
    dialogRefStub.afterClosed = () => of(true);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch new courses when loadMore button is pressed', () => {
    const buttonRef: ElementRef = debugElement.query(By.css('.load-more'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();

    expect(coursesService.getList).toHaveBeenCalledTimes(1);
  });

  it('should delete a specified course when onItemDelete method is called', () => {
    mockNumber = 2;
    component.onItemDelete(mockNumber);
    // fixture.detectChanges();

    expect(coursesService.removeItem).toHaveBeenCalledTimes(1);
  });

  it('should not update the deletedItem property if Delete button in dialog was not clicked', () => {
    dialogRefStub.afterClosed = () => of(false);
    mockNumber = 2;
    component.onItemDelete(mockNumber);

    expect(coursesService.removeItem).toHaveBeenCalledTimes(0);
  });

  describe('interactions with course-controls component', () => {

    beforeEach(() => {
      childDebugElement = fixture.debugElement.query(By.directive(CourseControlsComponent));
    });

    it('should sort courses list by creation date with provided value', () => {
      mockString = 'length';
      const buttonRef: ElementRef = debugElement.query(By.css('.sorting-button'));
      const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
      spyOn(component, 'onItemsSort').and.callThrough();
      (childDebugElement.context as CourseControlsComponent).sortingValue = mockString;
      button.click();
      fixture.detectChanges();

      expect(component.onItemsSort).toHaveBeenCalledTimes(1);
      expect(component.onItemsSort).toHaveBeenCalledWith(mockString);
      expect(coursesService.getList).toHaveBeenCalledTimes(1);
      expect(coursesService.getList).toHaveBeenCalledWith(null, null, mockString);
    });

    it('should filter courses list with provided filtering value', () => {
      mockString = '2';
      const buttonRef: ElementRef = debugElement.query(By.css('.search-button'));
      const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
      spyOn(component, 'onItemsSearch').and.callThrough();
      (childDebugElement.context as CourseControlsComponent).searchQuery = mockString;
      button.click();
      fixture.detectChanges();

      expect(component.onItemsSearch).toHaveBeenCalledTimes(1);
      expect(component.onItemsSearch).toHaveBeenCalledWith(mockString);
      expect(coursesService.getList).toHaveBeenCalledTimes(1);
      expect(coursesService.getList).toHaveBeenCalledWith(null, null, null, mockString);
    });
  });
});
