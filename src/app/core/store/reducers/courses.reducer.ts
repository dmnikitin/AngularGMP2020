import { Action, ActionReducer, on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import {
  getCoursesSuccess,
  getCourseByIdSuccess,
  updateCourseSuccess,
  deleteCourseSuccess,
  createCourseSuccess
} from '../actions/courses.actions';
import { CoursesState, initialCoursesState } from '../state/courses.state';

const reducer: ActionReducer<CoursesState, Action> = createReducer<CoursesState>(
  initialCoursesState,
  on(getCoursesSuccess, (state, { payload }) => ({...state, courses: payload })),
  on(getCourseByIdSuccess, (state, { payload }) =>  ({...state, selectedCourse: payload })),
  on(updateCourseSuccess, () => initialCoursesState),
  on(deleteCourseSuccess, () => initialCoursesState),
  on(createCourseSuccess, () => initialCoursesState)
);

type CoursesReducer = (state: CoursesState, action: Action) => CoursesState;
export const coursesReducer: CoursesReducer = (state, action) => reducer(state, action);
