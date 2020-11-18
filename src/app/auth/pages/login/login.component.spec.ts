import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spyAuthService: AuthService;

  beforeEach(async () => {
    spyAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule, RouterTestingModule
      ],
      providers: [{
        provide: AuthService,
        useValue: spyAuthService
      }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log user in if credentials provided', () => {
    component.email = 'email';
    component.password = '123';
    component.handleLogin();

    expect(spyAuthService.login).toHaveBeenCalledWith('email');
  });

  it('should log to console error message if no credentials provided', () => {
    component.handleLogin();

    expect(console.log).toHaveBeenCalledWith('please provide credentials');
  });
});
