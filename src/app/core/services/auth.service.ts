import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, Token } from 'src/app/shared/models/user';
import { authUrl } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authencticationStatus: boolean = false;
  private accessToken: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public getToken(): string {
    return this.accessToken;
  }

  public isAuthenticated(): boolean {
    const accessToken: string = localStorage.getItem('accessToken');
    if (accessToken) {
      this.authencticationStatus = true;
      this.accessToken = accessToken;
    }
    return this.authencticationStatus;
  }

  public login(userName: string, password: string): Observable<Token> {
    const body: Pick<User, 'login' | 'password'> = { login: userName, password };
    const headers: HttpHeaders = new HttpHeaders().set('token', 'no-token');
    return this.http.post<Token>(`${authUrl}/login`, body, {headers})
      .pipe(tap((data: Token)=>{
        this.accessToken = data.token;
        this.authencticationStatus = true;
        localStorage.setItem('accessToken', this.accessToken);
        this.router.navigate(['/courses']);
      }));
  }

  public logout(): void {
    this.authencticationStatus = false;
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>(`${authUrl}/userinfo`, {token: this.accessToken});
  }
}
