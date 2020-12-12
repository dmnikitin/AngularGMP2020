import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';

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
    this.activatedRoute.data.pipe(take(1)).subscribe((params: {routeData: BreadcrumbsResolverData}) => {
      if (params.routeData.course) {
        this.course = { ...params.routeData.course};
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
      const newCourseId: string = (this.coursesService.courses.length + 1).toString();
      this.coursesService.createItem({...this.course, id: newCourseId});
    } else {
      this.coursesService.updateItem(this.course.id, this.course);
    }
    this.router.navigate(['courses']);
  }
}
