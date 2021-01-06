import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { CoursesState } from './../store/state/courses.state';
import { CoursesActions, getCourseById } from '../store/actions/courses.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsResolverService implements Resolve<BreadcrumbsResolverData | HttpErrorResponse>{

  constructor(private store: Store<{ courses: CoursesState }>, private action$: Actions) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<BreadcrumbsResolverData | HttpErrorResponse> {
    const {id} = route.params as {id: number};
    if (id) {
      this.store.dispatch(getCourseById({id}));
      return this.action$.pipe(
        ofType(CoursesActions.getCourseByIdSuccess),
        take(1),
        switchMap(({payload}: {payload: Course}) => of({breadcrumbs: `/ ${payload.name}`, course: payload})),
        catchError((err: HttpErrorResponse) => of(err))
      );
    }
    return of({ breadcrumbs: '/ New course' });
  }
}
