import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { of } from 'rxjs/internal/observable/of';
import { User } from 'src/app/shared/models/user';
import { authUrl } from 'src/assets/variables';
import { throwError } from 'rxjs';

const mockUser: User = {
  id: 1,
  name: {firstName: 'john', lastName: 'doe'},
  token: 'fakeToken',
  login: 'admin',
  password: 'asdmin'
};

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorage.removeItem('accessToken');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send correct http requests when service methods are called', () => {
    service.getUserInfo().subscribe(() => {});
    const req: TestRequest = httpTestingController.expectOne(`${authUrl}/userinfo`);

    expect(req.request.method).toBe('POST');
  });

  it('should return user when getUserInfo method is called', () => {
    spyOn(httpClient, 'post').and.returnValue(of(mockUser));
    service.getUserInfo().subscribe(user => {
      expect(user.token).toEqual(mockUser.token);
    });
  });

  it('should throw an error if there was an error in server response', () => {
    spyOn(httpClient, 'post').and.returnValue(throwError('error'));
    service.getUserInfo().subscribe();
    service.login('login', 'password').subscribe();

    expect(httpClient.post).toHaveBeenCalledTimes(2);
  });

  it('should login user if credentials provided', () => {
    spyOn(httpClient, 'post').and.returnValue(of({token: 'fakeToken'}));
    service.login('JohnDoe', 'password').subscribe(token => {
      const newToken: string = service.getToken();

      expect(token.token).toEqual('fakeToken');
      expect(newToken).toEqual('fakeToken');
      expect(router.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });

  it('should return authenticationStatus: false if user logs out ', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });
});
