import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './pages/add-course-page/add-course-page.component';

const routes: Routes = [
  { path: '', component: CoursesPageComponent },
  { path: 'add', pathMatch: 'full', component: AddCoursePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
