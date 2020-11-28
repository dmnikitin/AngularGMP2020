import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean;
  public userName: string;
  public breadcrumbs: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  public handleLogout(): void {
    this.authService.logout();
  }

  public ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserInfo();
    this.activatedRoute.data.pipe(take(1)).subscribe((params: {routeData: BreadcrumbsResolverData}) => {
      this.breadcrumbs = params.routeData ? params.routeData.breadcrumbs : '';
    });
  }
}
