import { createAction, ActionCreator, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Course } from 'src/app/shared/models/course';

export enum CoursesActions {
  getCourses = 'GET_COURSES',
  getCoursesSuccess = 'GET_COURSES_SUCCESS',
  getCourseById = 'GET_COURSE_BY_ID',
  getCourseByIdSuccess = 'GET_COURSE_BY_ID_SUCCESS',
  updateCourse = 'UPDATE_COURSE',
  updateCourseSuccess = 'UPDATE_COURSE_SUCCESS',
  deleteCourse = 'DELETE_COURSE',
  deleteCourseSuccess = 'DELETE_COURSE_SUCCESS',
  createCourse = 'CREATE_COURSE',
  createCourseSuccess = 'CREATE_COURSE_SUCCESS',
}

type ActionCreatorPayload<T extends string, K> =
  ActionCreator<T, (props: { payload: K }) => { payload: K } & TypedAction<T>>;

export const getCourses: ActionCreator<CoursesActions.getCourses> = createAction(CoursesActions.getCourses);

export const getCourseById: ActionCreatorPayload<CoursesActions.getCourseById, number> =
  createAction(CoursesActions.getCourseById, props<{payload: number}>());

export const updateCourse: ActionCreatorPayload<CoursesActions.updateCourse, {id: number; course: Course}> =
  createAction(CoursesActions.updateCourse, props<{payload: {id: number; course: Course}}>());

export const deleteCourse: ActionCreatorPayload<CoursesActions.deleteCourse, number> =
  createAction(CoursesActions.deleteCourse, props<{payload: number}>());

export const createCourse: ActionCreatorPayload<CoursesActions.createCourse, Course> =
  createAction(CoursesActions.createCourse, props<{payload: Course}>());

export const getCoursesSuccess: ActionCreatorPayload<CoursesActions.getCoursesSuccess, Course[]> =
  createAction(CoursesActions.getCoursesSuccess, props<{payload: Course[]}>());

export const getCourseByIdSuccess: ActionCreatorPayload<CoursesActions.getCourseByIdSuccess, Course> =
  createAction(CoursesActions.getCourseByIdSuccess, props<{payload: Course}>());

export const updateCourseSuccess: ActionCreatorPayload<CoursesActions.updateCourseSuccess, Course> =
  createAction(CoursesActions.updateCourseSuccess, props<{payload: Course}>());

export const deleteCourseSuccess: ActionCreatorPayload<CoursesActions.deleteCourseSuccess, Course> =
  createAction(CoursesActions.deleteCourseSuccess, props<{payload: Course}>());

export const createCourseSuccess: ActionCreatorPayload<CoursesActions.createCourseSuccess, Course> =
  createAction(CoursesActions.createCourseSuccess, props<{payload: Course}>());

