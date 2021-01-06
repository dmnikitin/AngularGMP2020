import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { from, of, Observable } from 'rxjs';

const activatedRoute: { [prop: string]: Observable<Record<string, unknown>>} = {
  params: from([{id: 1}]),
  data: of({page: 'New course'})
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LogoComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router},
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout when logout button is pressed', () => {
    authService.isAuthenticated.next(true);
    fixture.detectChanges();
    spyOn(authService, 'logout');
    const buttonRef: ElementRef = debugElement.query(By.css('.logout'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();

    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
