import { TestBed } from '@angular/core/testing';
import { Course } from 'src/app/shared/models/course';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let mockId: string;
  const mockCourse: Course = {
    id: '005',
    title: 'course5',
    description: 'descr5',
    duration: 30,
    creationDate:'',
    rated: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return courses list', () => {
    const courses: Course[] = service.getList();

    expect(courses.length).toEqual(3);
  });

  it('should return course with provided id', () => {
    mockId = '002';
    const course: Course = service.getItemById(mockId);

    expect(course.id).toEqual(mockId);
  });

  it('should update selected course', () => {
    mockId = '002';
    service.updateItem(mockId, mockCourse);

    expect(service.courses[1].id).toEqual(mockCourse.id);
  });

  it('should remove specified course from array', () => {
    mockId = '002';
    service.removeItem(mockId);

    expect(service.courses.length).toEqual(2);
  });

  it('should add provided course to courses array', () => {
    service.createItem(mockCourse);

    expect(service.courses.length).toEqual(4);
  });

});
