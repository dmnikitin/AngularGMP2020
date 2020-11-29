import { CoursesService } from './../services/courses.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsResolverService implements Resolve<BreadcrumbsResolverData>{

  constructor(private coursesService: CoursesService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<BreadcrumbsResolverData> {
    let breadcrumbs: string;

    const {id} = route.params;
    const {page} = route.data;
    return this.coursesService.getItemById(id).pipe(
      take(1),
      switchMap((course: Course) => {
        if (page === 'New course') {
          breadcrumbs = `/ ${page as string}`;
        }
        if (course) {
          breadcrumbs = `/ ${course.name as string}`;
        }
        return of({breadcrumbs, course});
      })
    );

  }
}
