import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

type MockFunc = { isAuthenticated: () => boolean };
const mockAuthTrue: MockFunc = {isAuthenticated: () => true};
const mockAuthFalse: MockFunc = {isAuthenticated: () => false};

describe('AuthGuard tests positive', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthTrue}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    spyOn(guard, 'canLoad').and.callThrough();

    expect(guard.canLoad()).toBeTruthy();
  });
});

describe('AuthGuard tests negative', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: mockAuthFalse},
        {provide: Router, useValue: router}
      ]
    });
  });

  it('should redirect to /login if user is not authenticated', () => {
    guard = TestBed.inject(AuthGuard);
    guard.canLoad();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
