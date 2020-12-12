import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, Token } from 'src/app/shared/models/user';
import { authUrl } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string;

  public user: BehaviorSubject<User> = new BehaviorSubject({name: {firstName: '', lastName: ''}} as User);
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getTokenFromLocalStorage();
  }

  private getTokenFromLocalStorage(): void {
    const accessToken: string = localStorage.getItem('accessToken');
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  public getToken(): string {
    return this.accessToken;
  }

  public login(userName: string, password: string): Observable<Token> {
    const body: Pick<User, 'login' | 'password'> = { login: userName, password };
    const headers: HttpHeaders = new HttpHeaders().set('token', 'no-token');
    return this.http.post<Token>(`${authUrl}/login`, body, {headers}).pipe(
      tap((data: Token)=> {
        this.accessToken = data.token;
        this.isAuthenticated.next(true);
        localStorage.setItem('accessToken', this.accessToken);
        this.router.navigate(['/courses']);
      })
    );
  }

  public logout(): void {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>(`${authUrl}/userinfo`, {token: this.accessToken}).pipe(
      tap(user => {
        this.user.next(user);
        this.isAuthenticated.next(true);
      })
    );
  }
}
