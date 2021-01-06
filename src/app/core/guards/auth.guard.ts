import { Injectable } from '@angular/core';
import { UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { UserState } from '../store/state/user.state';
import { getUserInfo } from '../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<{ user: UserState }>, private router: Router){}
  public canActivate(): Observable<boolean | UrlTree> {
    this.store.dispatch(getUserInfo());
    return this.store.pipe(
      select('user'),
      take(1),
      map(value => {
        if (value) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}
