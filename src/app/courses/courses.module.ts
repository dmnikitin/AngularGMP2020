import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseControlsComponent } from './components/course-controls/course-controls.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { BorderDirective } from './directives/border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesPageComponent,
    CourseControlsComponent,
    DeleteModalComponent,
    BorderDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
