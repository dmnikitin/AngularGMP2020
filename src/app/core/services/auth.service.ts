import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authencticationStatus: boolean = false;
  private userName: string;
  private accessToken: string;
  constructor(private router: Router) { }

  public isAuthenticated(): boolean {
    const userName: string = localStorage.getItem('userName');
    const accessToken: string = localStorage.getItem('accessToken');
    if (userName && accessToken) {
      this.authencticationStatus = true;
      this.userName = userName;
    }
    return this.authencticationStatus;
  }

  public login(userName: string): void {
    this.authencticationStatus = true;
    this.userName = userName;
    this.accessToken = `token${Math.random()}`;
    this.router.navigate(['/courses-page']);
    localStorage.setItem('userName', this.userName);
    localStorage.setItem('accessToken', this.accessToken);
    console.log('LoggedIn successfully');
  }

  public logout(): void {
    this.authencticationStatus = false;
    this.userName = '';
    this.router.navigate(['/login']);
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
  }

  public getUserInfo(): string {
    return this.userName;
  }
}
