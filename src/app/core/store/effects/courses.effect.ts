
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CoursesService } from 'src/app/core/services/courses.service';
import { CoursesActions } from '../actions/courses.actions';
import { Course } from 'src/app/shared/models/course';

@Injectable()
export class CoursesEffects {

  public getCourses$: unknown = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.getCourses),
    mergeMap(({ start, count, sort, textFragment }) =>
      this.coursesService.getList(start, count, sort, textFragment)
        .pipe(
          map((courses: Course[]) => ({ type: CoursesActions.getCoursesSuccess, payload: courses })),
          catchError(() => EMPTY)
        ))
  ));

  public getCourseById$: unknown = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.getCourseById),
    mergeMap(({ id }) =>
      this.coursesService.getItemById(id)
        .pipe(
          map(course => ({ type: CoursesActions.getCourseByIdSuccess, payload: course })),
          catchError(() => EMPTY)
        ))
  ));

  public updateCourse$: unknown = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.updateCourse),
    mergeMap(({ id, course }) =>
      this.coursesService.updateItem(id, course)
        .pipe(
          map((updatedCourse) => ({ type: CoursesActions.updateCourseSuccess, payload: updatedCourse })),
          catchError(() => EMPTY)
        ))
  ));

  public deleteCourse$: unknown = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.deleteCourse),
    mergeMap(({ id }) =>
      this.coursesService.removeItem(id)
        .pipe(
          map(() => ({ type: CoursesActions.deleteCourseSuccess })),
          catchError(() => EMPTY)
        ))
  ));

  public createCourse$: unknown = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.createCourse),
    mergeMap(({ course }) =>
      this.coursesService.createItem(course)
        .pipe(
          map((newCourse: Course) => ({ type: CoursesActions.createCourseSuccess, payload: newCourse })),
          catchError(() => EMPTY)
        ))
  ));

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
