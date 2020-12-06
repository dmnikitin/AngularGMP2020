import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mockCourses } from 'src/assets/mock-data';
import { coursesUrl } from 'src/assets/variables';
import { Course } from 'src/app/shared/models/course';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const mockCourse: Course = {
    id: 5,
    name: 'course5',
    description: 'descr5',
    length: 30,
    date:'',
    isTopRated: false,
    authors: { id: 1, name: 'authors'}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CoursesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send correct http requests when service methods are called', () => {
    service.getItemById(2).subscribe(() => {});
    const req: TestRequest = httpTestingController.expectOne('http://localhost:3004/courses/2');

    expect(req.request.method).toBe('GET');
  });

  it('should return courses list', () => {
    spyOn(httpClient, 'get').and.returnValue(of(mockCourses));
    service.getList().subscribe((courses) => {
      expect(courses.length).toBe(3);
    });
  });

  it('should return course with provided id', () => {
    spyOn(httpClient, 'get').and.returnValue(of(mockCourses[1]));
    service.getItemById(2).subscribe((course) => {
      expect(course.id).toBe(2);
    });
  });

  it('should update selected course', () => {
    spyOn(httpClient, 'patch').and.returnValue(of(mockCourse));
    service.updateItem(5, mockCourse).subscribe((course) => {
      expect(course.id).toBe(5);
    });
  });

  it('should remove specified course', () => {
    spyOn(httpClient, 'delete').and.returnValue(of(mockCourse));
    service.removeItem(5).subscribe((course) => {
      expect(course.id).toBe(5);
    });
  });

  it('should add provided course to courses list', () => {
    spyOn(httpClient, 'post').and.returnValue(of(mockCourse));
    service.createItem(mockCourse).subscribe((course) => {
      expect(course.id).toBe(5);
    });
  });

});
