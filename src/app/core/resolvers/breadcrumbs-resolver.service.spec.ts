import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesService } from '../services/courses.service';
import { BreadcrumbsResolverService } from './breadcrumbs-resolver.service';

describe('BreadcrumbsResolverService', () => {
  let service: BreadcrumbsResolverService;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(BreadcrumbsResolverService);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve breadcrumbs: "/ New course" when routed from new course page', () => {
    route.params = { id: '' };
    route.data = { page: 'New course' };

    expect(service.resolve(route).breadcrumbs).toEqual('/ New course');
  });

  it('should resolve empty breadcrumbs when routed from undisclosed page', () => {
    route.params = { id: '' };
    route.data = { page: '' };

    expect(service.resolve(route).breadcrumbs).toBeFalsy();
  });

  it('should resolve breadcrumbs with course provided in route', () => {
    TestBed.overrideProvider(CoursesService, {useValue: {
      getItemById: ()=>({id: '003'})
    }});
    route.params = { id: '003' };
    route.data = { page: 'Edit course', routeData: {course: {id: '003'}}};

    expect(service.resolve(route).course.id).toEqual('003');
  });
});
