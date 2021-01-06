/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { ApiCallInterceptor } from './api-call.interceptor';

describe('ApiCallInterceptor', () => {

  let service: AuthService;
  let interceptor: ApiCallInterceptor;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
    providers: [ ApiCallInterceptor, AuthService ]
  }));

  beforeEach(() => {
    service = TestBed.inject(AuthService);
    interceptor = TestBed.inject(ApiCallInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
    spyOn(service, 'getToken').and.returnValue('mockToken');
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not set authorization token to the request (if user is not authenticated)', () => {
    localStorage.removeItem('accessToken');
    service.login('fakelog', 'fakepass').subscribe();

    const req: TestRequest = httpTestingController.expectOne('http://localhost:3004/auth/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });

});
