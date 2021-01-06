import { Action, ActionReducer, on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { getUserInfoSuccess, loginSuccess, logoutSuccess } from './../actions/user.actions';
import { UserState, initialUserState } from './../state/user.state';

const reducer: ActionReducer<UserState, Action> = createReducer<UserState>(
  initialUserState,
  on(getUserInfoSuccess, (state, { payload }) => ({ user: payload, isAuthenticated: true })),
  on(loginSuccess, (state) => ({...state})),
  on(logoutSuccess, () => ({ user: null, isAuthenticated: false }))
);

type UserReducer = (state: UserState, action: Action) => UserState;
export const userReducer: UserReducer = (state, action) => reducer(state, action);
