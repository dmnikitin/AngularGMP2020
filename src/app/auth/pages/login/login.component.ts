import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  public handleLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .pipe(take(1)).subscribe((token: string) => {
          console.log('🚀 login comp token', token);
          this.router.navigate(['/courses']);
        });
    } else {
      console.log('please provide credentials');
    }
  }

  public ngOnInit(): void {
  }

}
