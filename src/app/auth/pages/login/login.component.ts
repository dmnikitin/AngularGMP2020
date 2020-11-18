import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: AuthService) { }

  public handleLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email);
    } else {
      console.log('please provide credentials');
    }
  }

  public ngOnInit(): void {
  }

}
