
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CoursesService } from 'src/app/core/services/courses.service';
import { CoursesActions } from '../actions/courses.actions';

@Injectable()
export class CoursesEffects {

  public getCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.getCoursesSuccess),
    mergeMap(() => this.coursesService.getCourses()
      .pipe(
        map(courses => ({ type: CoursesActions.getCoursesSuccess, payload: courses })),
        catchError(() => EMPTY)
      ))
  ));

  public getCourseById$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.getCourseById),
    mergeMap(() => this.coursesService.getItemById()
      .pipe(
        map(course => ({ type: CoursesActions.getCourseByIdSuccess })),
        catchError(() => EMPTY)
      ))
  ));

  public updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.updateCourse),
    mergeMap(() => this.coursesService.updateItem()
      .pipe(
        map(course => ({ type: CoursesActions.updateCourseSuccess })),
        catchError(() => EMPTY)
      ))
  ));

  public deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    mergeMap(() => this.coursesService.removeItem()
      .pipe(
        map(course => ({ type: CoursesActions.deleteCourseSuccess })),
        catchError(() => EMPTY)
      ))
  ));

  public createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.createCourse),
    mergeMap(() => this.coursesService.createItem()
      .pipe(
        map(course => ({ type: CoursesActions.createCourseSuccess })),
        catchError(() => EMPTY)
      ))
  ));

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
