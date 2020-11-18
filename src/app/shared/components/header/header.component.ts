import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean = false;
  public userName: string;
  constructor(private authService: AuthService) { }

  public handleLogout(): void {
    this.authService.logout();
  }

  public ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserInfo();
  }
}
