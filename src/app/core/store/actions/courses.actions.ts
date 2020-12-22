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

type GetCoursesListArgs = { start?: number; count?: number; sort?: string; textFragment?: string };
type ICourseId = { id: number; course: Course };
type Payload<T> = { payload: T};

type ActionCreatorPayload<T extends string, K> =
  ActionCreator<T, (props: K ) => K & TypedAction<T>>;

export const getCourses: ActionCreatorPayload<CoursesActions.getCourses, GetCoursesListArgs> =
  createAction(CoursesActions.getCourses, props<GetCoursesListArgs>());

export const getCourseById: ActionCreatorPayload<CoursesActions.getCourseById, {id: number}> =
  createAction(CoursesActions.getCourseById, props<{id: number}>());

export const updateCourse: ActionCreatorPayload<CoursesActions.updateCourse, ICourseId> =
  createAction(CoursesActions.updateCourse, props<ICourseId>());

export const deleteCourse: ActionCreatorPayload<CoursesActions.deleteCourse, {id: number}> =
  createAction(CoursesActions.deleteCourse, props<{id: number}>());

export const createCourse: ActionCreatorPayload<CoursesActions.createCourse, {course: Course}> =
  createAction(CoursesActions.createCourse, props<{course: Course}>());

export const getCoursesSuccess: ActionCreatorPayload<CoursesActions.getCoursesSuccess, Payload<Course[]>> =
  createAction(CoursesActions.getCoursesSuccess, props<Payload<Course[]>>());

export const getCourseByIdSuccess: ActionCreatorPayload<CoursesActions.getCourseByIdSuccess, Payload<Course>>=
  createAction(CoursesActions.getCourseByIdSuccess, props<Payload<Course>>());

export const updateCourseSuccess: ActionCreatorPayload<CoursesActions.updateCourseSuccess, Payload<Course>> =
  createAction(CoursesActions.updateCourseSuccess, props<Payload<Course>>());

export const deleteCourseSuccess: ActionCreatorPayload<CoursesActions.deleteCourseSuccess, Payload<Course>> =
  createAction(CoursesActions.deleteCourseSuccess, props<Payload<Course>>());

export const createCourseSuccess: ActionCreatorPayload<CoursesActions.createCourseSuccess, Payload<Course>> =
  createAction(CoursesActions.createCourseSuccess, props<Payload<Course>>());
