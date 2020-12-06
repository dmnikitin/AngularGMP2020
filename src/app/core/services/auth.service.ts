import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, Token } from 'src/app/shared/models/user';
import { authUrl } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string;
  public user: Subject<User> = new Subject();
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // private authencticationStatus: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getTokenFromLocalStorage();
  }

  public getToken(): string {
    return this.accessToken;
  }

  private getTokenFromLocalStorage(): void {
    const accessToken: string = localStorage.getItem('accessToken');
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  // public isAuthenticated(): boolean {
  //   const accessToken: string = localStorage.getItem('accessToken');
  //   if (accessToken) {
  //     this.authencticationStatus = true;
  //     this.accessToken = accessToken;
  //   }
  //   return this.authencticationStatus;
  // }

  public login(userName: string, password: string): Observable<Token> {
    const body: Pick<User, 'login' | 'password'> = { login: userName, password };
    const headers: HttpHeaders = new HttpHeaders().set('token', 'no-token');
    return this.http.post<Token>(`${authUrl}/login`, body, {headers})
      .pipe(tap((data: Token)=> {
        this.accessToken = data.token;
        // this.authencticationStatus = true;
        this.isAuthenticated.next(true);
        localStorage.setItem('accessToken', this.accessToken);
        this.router.navigate(['/courses']);
      }));
  }

  public logout(): void {
    // this.authencticationStatus = false;
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>(`${authUrl}/userinfo`, {token: this.accessToken});
  }
}
