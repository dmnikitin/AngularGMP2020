import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(AuthService);
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
    spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user if username and token present in localstorage', () => {
    const mockUser: {[key: string]: string} = {userName: 'name', acessToken: '123'};
    localStorage.setItem('userName', mockUser.userName);
    localStorage.setItem('accessToken', mockUser.accessToken);
    service.isAuthenticated();
    const userInfo: string = service.getUserInfo();

    expect(userInfo).toEqual(mockUser.userName);
  });

  it('should login user if credentials provided', () => {
    service.login('JohnDoe');
    const userInfo: string = service.getUserInfo();

    expect(userInfo).toEqual('JohnDoe');
    expect(router.navigate).toHaveBeenCalledWith(['/courses-page']);
    expect(console.log).toHaveBeenCalledWith('LoggedIn successfully');
  });

  it('should return authenticationStatus: false if user logs out ', () => {
    service.logout();
    const userInfo: string = service.getUserInfo();
    const isAuthenticated: boolean = service.isAuthenticated();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(userInfo).toBeFalsy();
    expect(isAuthenticated).toBeFalsy();
  });
});
