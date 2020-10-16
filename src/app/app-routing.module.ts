import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';

const routes: Routes = [
  { path: 'courses-page', component: CoursesPageComponent },
  { path: '', redirectTo: 'courses-page', pathMatch: 'full' },
  { path: '**', redirectTo: 'courses-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
