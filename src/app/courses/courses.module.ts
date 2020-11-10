import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { AddCoursePageComponent } from './pages/add-course-page/add-course-page.component';
import { CourseControlsComponent } from './components/course-controls/course-controls.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { BorderDirective } from './directives/border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { InputDurationComponent } from './components/input-duration/input-duration.component';
import { InputAuthorsComponent } from './components/input-authors/input-authors.component';

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesPageComponent,
    AddCoursePageComponent,
    CourseControlsComponent,
    DeleteModalComponent,
    BorderDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    DatePickerComponent,
    InputDurationComponent,
    InputAuthorsComponent
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
