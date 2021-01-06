import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './pages/add-course-page/add-course-page.component';
import { BreadcrumbsResolverService } from '../core/resolvers/breadcrumbs-resolver.service';

const routes: Routes = [
  { path: '', component: CoursesPageComponent },
  {
    path: 'new',
    component: AddCoursePageComponent,
    resolve: { routeData: BreadcrumbsResolverService},
    data: {
      page: 'New course'
    }
  },
  {
    path: ':id',
    component: AddCoursePageComponent,
    resolve: { routeData: BreadcrumbsResolverService},
    data: {
      page: 'Edit course'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
