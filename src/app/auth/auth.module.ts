import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent, NotFoundComponent
  ],
  imports: [
    SharedModule, RouterModule, ReactiveFormsModule
  ],
  exports: [
    LoginComponent, NotFoundComponent
  ]
})
export class AuthModule { }
