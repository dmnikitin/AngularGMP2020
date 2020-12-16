import { Action, ActionReducer, on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { AppState, initialAppState } from '../state/app.state';
import {
  getCoursesSuccess,
  getCourseByIdSuccess,
  updateCourseSuccess,
  deleteCourseSuccess,
  createCourseSuccess
} from '../actions/courses.actions';

const reducer: ActionReducer<AppState, Action> = createReducer<AppState>(
  initialAppState,
  on(getCoursesSuccess, (state, { payload }) => ({...state, payload })),
  on(getCourseByIdSuccess, () => initialAppState),
  on(updateCourseSuccess, () => initialAppState),
  on(deleteCourseSuccess, () => initialAppState),
  on(createCourseSuccess, () => initialAppState)
);

type CoursesReducer = (state: AppState, action: Action) => AppState;
export const coursesReducer: CoursesReducer = (state, action) => reducer(state, action);
