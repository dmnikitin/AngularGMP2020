import { CoursesService } from './../services/courses.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsResolverService implements Resolve<BreadcrumbsResolverData | HttpErrorResponse>{

  constructor(private coursesService: CoursesService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<BreadcrumbsResolverData | HttpErrorResponse> {
    const {id} = route.params;
    if (id) {
      return this.coursesService.getItemById(id).pipe(
        take(1),
        switchMap((course: Course) => of({breadcrumbs: `/ ${course.name}`, course})),
        catchError((err: HttpErrorResponse) => of(err))
      );
    }
    return of({ breadcrumbs: '/ New course' });
  }
}
