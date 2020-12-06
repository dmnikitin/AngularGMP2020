import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ElementRef, DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCoursePageComponent } from './add-course-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddCourseComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let debugElement: DebugElement;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let id: number;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ AddCoursePageComponent ],
      imports: [
        FormsModule,
        SharedModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [ CoursesService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddCoursePageComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    id = 3;
    activatedRoute.data = of({routeData: { breadcrumbs: 'New course', course: {id}}});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show course if correct params value was passed ', () => {
    component.ngOnInit();

    expect(component.course.id).toEqual(id);
  });

  it('should navigate to 404 if params value is not equal to one of courses.id', () => {
    activatedRoute.data = of({routeData: { breadcrumbs: 'New course'}});
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['404']);
  });

  it('should create a blank course object when route leads to New course page', () => {
    activatedRoute.snapshot.data.page = 'New course';
    component.ngOnInit();

    expect(component.pageTitle).toEqual('New course');
    expect(component.course.id).toBeFalsy();
  });

  it('should redirect to courses a return button is pressed', () => {
    spyOn(component, 'handleReturn').and.callThrough();
    spyOn(router, 'navigate');
    const buttonRef: ElementRef = debugElement.query(By.css('.return'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();

    expect(component.handleReturn).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['courses']);
  });

  it('should update course and redirect when an edit-course button is pressed', () => {
    spyOn(component, 'handleAddCourse').and.callThrough();
    spyOn(router, 'navigate');
    const buttonRef: ElementRef = debugElement.query(By.css('.add-course'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();

    expect(component.handleAddCourse).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['courses']);
  });

  it('should create new course and redirect when an add-course button is pressed', () => {
    const service: CoursesService = TestBed.inject(CoursesService);
    activatedRoute.snapshot.data.page = 'New course';
    spyOn(component, 'handleAddCourse').and.callThrough();
    spyOn(service, 'createItem').and.callThrough();
    spyOn(router, 'navigate');

    component.ngOnInit();

    const buttonRef: ElementRef = debugElement.query(By.css('.add-course'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();

    expect(component.handleAddCourse).toHaveBeenCalledTimes(1);
    expect(service.createItem).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['courses']);
  });
});
