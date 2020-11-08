import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from 'src/app/core/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    router = jasmine.createSpyObj<Router>('router', ['navigate']);
    authService = jasmine.createSpyObj<AuthService>('authService', [
      'logout', 'isAuthenticated', 'getUserInfo'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LogoComponent ],
      providers: [{ provide: Router, useValue: router}, { provide: AuthService, useValue: authService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout when logout button is pressed', () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    const buttonRef: ElementRef = debugElement.query(By.css('.logout'));
    const button: HTMLButtonElement = buttonRef.nativeElement as HTMLButtonElement;
    button.click();

    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
