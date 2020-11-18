import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './pages/add-course-page/add-course-page.component';

const routes: Routes = [
  { path: '', component: CoursesPageComponent },
  {
    path: 'new',
    pathMatch: 'full',
    component: AddCoursePageComponent,
    data: {
      page: 'New course'
    }
  },
  {
    path: ':id',
    component: AddCoursePageComponent,
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
