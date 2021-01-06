import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard tests', () => {
  let guard: AuthGuard;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService> ;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['getUserInfo']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([   ]),
        HttpClientTestingModule
      ],
      providers: [
        {provide: AuthService, useValue: authService }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    const mockUser: User = {id: 2} as User;
    authService.getUserInfo.and.returnValue(of(mockUser));
    guard.canActivate().pipe(take(1)).subscribe((value) => {
      expect(value).toBeTrue();
      expect(authService.getUserInfo).toHaveBeenCalledTimes(1);
    });
  });

  it('should redirect to /login if user is not authenticated', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authService.getUserInfo.and.returnValue(of(false) as any);
    guard.canActivate().subscribe((value)=>{
      expect(value).toBeFalse();
      expect(authService.getUserInfo).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['login']);
      done();
    });
  });
});

