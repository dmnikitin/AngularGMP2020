import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Token } from 'src/app/shared/models/user';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {

  public getUserInfo$: unknown = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUserInfo),
    mergeMap(() =>
      this.authService.getUserInfo()
        .pipe(
          map((user) => ({
            type: UserActions.getUserInfoSuccess,
            payload: user
          })),
          catchError(() => EMPTY)
        ))
  ));

  public login$: unknown = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(({ login, password }) =>
      this.authService.login(login, password)
        .pipe(
          tap((data: Token) => {
            this.authService.token = data.token;
            this.router.navigate(['/courses']);
            localStorage.setItem('accessToken', data.token);
          }),
          map((token: Token) => ({
            type: UserActions.loginSuccess,
            payload: token
          })),
          catchError(() => EMPTY)
        ))
  ));

  public logout$: unknown = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    tap(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('accessToken');
    }),
    map(() => ({ type: UserActions.logoutSuccess })),
    catchError(() => EMPTY)
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}

