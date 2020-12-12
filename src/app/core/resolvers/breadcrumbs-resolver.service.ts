import { CoursesService } from './../services/courses.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsResolverService implements Resolve<BreadcrumbsResolverData>{

  constructor(private coursesService: CoursesService) { }

  public resolve(route: ActivatedRouteSnapshot): BreadcrumbsResolverData {
    let breadcrumbs: string;
    const {id} = route.params;
    const {page} = route.data;
    const course: Course = this.coursesService.getItemById(id);
    if (page === 'New course') {
      breadcrumbs = `/ ${page as string}`;
    }
    if (course) {
      breadcrumbs = `/ ${course.title}`;
    }
    return {breadcrumbs, course};
  }
}
