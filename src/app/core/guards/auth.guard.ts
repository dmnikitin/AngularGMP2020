import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUserInfo().pipe(
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
