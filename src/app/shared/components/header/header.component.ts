import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { UserState } from 'src/app/core/store/state/user.state';
import { logout } from 'src/app/core/store/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<UserState>;
  public breadcrumbs: string;

  constructor(
    private store: Store<{ user: UserState }>,
    private activatedRoute: ActivatedRoute
  ) {
    this.user$ = store.pipe(select('user'));
  }

  public handleLogout(): void {
    this.store.dispatch(logout());
  }

  public ngOnInit(): void {
    this.activatedRoute.data.pipe(take(1)).subscribe((params: {routeData: BreadcrumbsResolverData}) => {
      this.breadcrumbs = params.routeData ? params.routeData.breadcrumbs : '';
    });
  }
}
