import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {

  public pageTitle: string;
  public authors: string;
  public course: Course;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService) { }

  public ngOnInit(): void {
    this.course = { id: '', title: '', duration: 0, creationDate: '', rated: false, description: '' };
    this.pageTitle = this.activatedRoute.snapshot.data.page as string;
    if (this.pageTitle === 'New course') {
      return;
    }
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      const course: Course = { ...this.coursesService.getItemById(params.id)};
      if (course) {
        this.course = course;
      } else {
        this.router.navigate(['404']);
      }
    });
  }

  public handleReturn(): void {
    this.router.navigate(['courses']);
  }

  public handleAddCourse(): void {
    if (this.pageTitle === 'New course') {
      this.coursesService.createItem(this.course);
    } else {
      this.coursesService.updateItem(this.course.id, this.course);
    }
    this.router.navigate(['courses']);
  }
}
