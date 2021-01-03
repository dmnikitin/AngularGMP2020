import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { login as loginAction } from 'src/app/core/store/actions/user.actions';
import { UserState } from 'src/app/core/store/state/user.state';
import { ILogin } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private store: Store<{ user: UserState }>, private fb: FormBuilder) { }

  public handleLogin(): void {
    const { login, password } = this.form.value as ILogin;
    this.store.dispatch(loginAction({ login, password }));
  }

  public ngOnInit(): void {
    // this.translate.setDefaultLang('en');
    this.form = this.fb.group({
      login: new FormControl('', [Validators.required.bind(this), Validators.minLength(3)]),
      password: new FormControl('', [Validators.required.bind(this)])
    });
  }
}
