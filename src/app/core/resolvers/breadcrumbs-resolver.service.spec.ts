import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { mockCourses } from 'src/assets/mock-data';
import { CoursesService } from '../services/courses.service';
import { BreadcrumbsResolverService } from './breadcrumbs-resolver.service';

describe('BreadcrumbsResolverService', () => {
  let service: BreadcrumbsResolverService;
  let coursesService: CoursesService;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
      providers: [ CoursesService ]
    });
    service = TestBed.inject(BreadcrumbsResolverService);
    coursesService = TestBed.inject(CoursesService);
    route = new ActivatedRouteSnapshot();
    spyOn(coursesService, 'getItemById').and.returnValue(of(mockCourses[1]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve breadcrumbs: "/ New course" when routed from new course page', () => {
    route.params = { id: '' };
    service.resolve(route).subscribe(result => {
      expect((result as BreadcrumbsResolverData).breadcrumbs ).toEqual('/ New course');
    });
  });

  it('should resolve breadcrumbs with course provided in route', () => {
    route.params = { id: 2 };
    service.resolve(route).subscribe(result => {
      expect((result as BreadcrumbsResolverData)).toEqual({
        breadcrumbs: `/ ${mockCourses[1].name}`,
        course: mockCourses[1]
      });
    });
  });
});
