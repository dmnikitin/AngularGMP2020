import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authencticationStatus: boolean = false;
  private userName: string;
  private accessToken: string;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public isAuthenticated(): boolean {
    const userName: string = localStorage.getItem('userName');
    const accessToken: string = localStorage.getItem('accessToken');
    if (userName && accessToken) {
      this.authencticationStatus = true;
      this.userName = userName;
    }
    return this.authencticationStatus;
  }

  public login(userName: string, password: string): Observable<string> {
    const headers: { [key: string]: string } = { login: userName, password };
    return this.http.post<string>('http://localhost:3004/auth/login', headers)
      .pipe(tap((token: string)=>{
        this.accessToken = token;
        this.authencticationStatus = true;
        this.userName = userName;
        localStorage.setItem('userName', this.userName);
        localStorage.setItem('accessToken', this.accessToken);
      }));
  }

  public logout(): void {
    this.authencticationStatus = false;
    this.userName = '';
    this.router.navigate(['/login']);
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
  }

  public getUserInfo(): Observable<User> {
    return this.http.post<User>('http://localhost:3004/auth/userinfo', this.accessToken);
  }
}
