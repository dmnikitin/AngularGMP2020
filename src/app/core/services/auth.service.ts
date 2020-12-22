import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Token } from 'src/app/shared/models/user';
import { authUrl } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string;

  public user: BehaviorSubject<User> = new BehaviorSubject({name: {firstName: '', lastName: ''}} as User);
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.getTokenFromLocalStorage();
  }

  private getTokenFromLocalStorage(): void {
    const accessToken: string = localStorage.getItem('accessToken');
    if (accessToken) {
      this.token = accessToken;
    }
  }

  public get token(): string {
    return this.accessToken;
  }

  public set token(newToken: string) {
    this.accessToken = newToken;
  }

  public login(login: string, password: string): Observable<Token> {
    const body: Pick<User, 'login' | 'password'> = { login, password };
    const headers: HttpHeaders = new HttpHeaders().set('token', 'no-token');
    return this.http.post<Token>(`${authUrl}/login`, body, {headers});
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>(`${authUrl}/userinfo`, {token: this.token});
  }
}
