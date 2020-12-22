import { createAction, ActionCreator, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { ILogin, Token, User } from 'src/app/shared/models/user';

type ActionCreatorPayload<T extends string, K> = ActionCreator<T, (props: K ) => K & TypedAction<T>>;
type ActionCreatorDefault<T extends string> = ActionCreator<T, () => TypedAction<T>>;
type Payload<T> = { payload: T};

export enum UserActions {
  getUserInfo = 'GET_USERINFO',
  getUserInfoSuccess = 'GET_USERINFO_SUCCESS',
  login = 'LOGIN',
  loginSuccess = 'LOGIN_SUCCESS',
  logout = 'LOGOUT',
  logoutSuccess = 'LOGOUT_SUCCESS',
}

export const getUserInfo: ActionCreatorDefault<UserActions.getUserInfo> =
  createAction(UserActions.getUserInfo);

export const login: ActionCreatorPayload<UserActions.login, ILogin> =
  createAction(UserActions.login, props<ILogin>());

export const logout: ActionCreatorDefault<UserActions.logout> =
  createAction(UserActions.logout);

export const getUserInfoSuccess: ActionCreatorPayload<UserActions.getUserInfoSuccess, Payload<User>> =
  createAction(UserActions.getUserInfoSuccess, props<Payload<User>>());

export const loginSuccess: ActionCreatorPayload<UserActions.loginSuccess, Payload<Token>> =
  createAction(UserActions.loginSuccess, props<Payload<Token>>());

export const logoutSuccess: ActionCreator<UserActions.logoutSuccess> =
  createAction(UserActions.logoutSuccess);
