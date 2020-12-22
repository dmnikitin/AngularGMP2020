import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/app/core/store/actions/user.actions';
import { UserState } from 'src/app/core/store/state/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public email: string;
  public password: string;

  constructor(private store: Store<{ user: UserState }>) { }

  public handleLogin(): void {
    this.store.dispatch(login({ login: this.email, password: this.password }));
  }
}
