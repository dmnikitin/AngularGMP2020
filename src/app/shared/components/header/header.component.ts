import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean;
  public user: Observable<User>;
  public breadcrumbs: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  public handleLogout(): void {
    this.authService.logout();
  }

  public ngOnInit(): void {
    this.user = this.authService.getUserInfo();
    this.authService.isAuthenticated.pipe(take(1)).subscribe(value => {
      this.isAuthenticated = value;
    });
    this.activatedRoute.data.pipe(take(1)).subscribe((params: {routeData: BreadcrumbsResolverData}) => {
      this.breadcrumbs = params.routeData ? params.routeData.breadcrumbs : '';
    });
  }
}
