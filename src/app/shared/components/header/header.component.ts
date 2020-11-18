import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Course } from '../../models/course';

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
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  public handleLogout(): void {
    this.authService.logout();
  }

  public ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserInfo();
    this.activatedRoute.data.pipe(take(1)).subscribe(data => {
      if (data.page === 'New course') {
        this.breadcrumbs = `/ ${data.page as string}`;
      }
    });
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      const course: Course = this.coursesService.getItemById(params.id);
      if (course) {
        this.breadcrumbs = `/ ${course.title}`;
      }
    });
  }
}
