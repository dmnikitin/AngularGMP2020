/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { createCourse, updateCourse } from 'src/app/core/store/actions/courses.actions';
import { BreadcrumbsResolverData } from 'src/app/shared/models/breadcrumbs';
import { CoursesState } from 'src/app/core/store/state/courses.state';
import { Course } from 'src/app/shared/models/course';

const defaultCourse: Course = {
  id: 0,
  name: '',
  length: 0,
  date: '',
  isTopRated: false,
  description: '',
  authors: {
    id: '0',
    name: ''
  }
};

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {

  public pageTitle: string;
  public authors: string;
  public course: Course;
  public form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ courses: CoursesState }>,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.pageTitle = this.activatedRoute.snapshot.data.page as string;
    if (this.pageTitle === 'New course') {
      return;
    }
    this.activatedRoute.data.pipe(take(1))
      .subscribe((params: {routeData: BreadcrumbsResolverData}) => {
        if (params.routeData.course) {
          this.course = { ...params.routeData.course};
          const formValue: Omit<Course, 'isTopRated' | 'id'> = {
            name: this.course.name,
            description: this.course.description,
            length: this.course.length,
            date: this.formatDate(this.course.date),
            authors: this.course.authors
          };
          this.form.setValue(formValue);
        } else {
          this.router.navigate(['404']);
        }
      });
  }

  public handleReturn(): void {
    this.router.navigate(['courses']);
  }

  public handleAddCourse(): void {
    if (this.form.controls.date.valid) {
      this.form.controls.date.setValue(this.stringToDate(this.form.controls.date.value));
      this.form.updateValueAndValidity();
    }
    const course: Course = this.form.value as Course;
    if (this.pageTitle === 'New course') {
      this.store.dispatch(createCourse({ course }));
    } else {
      this.store.dispatch(updateCourse({ id: this.course.id, course }));
    }
    this.router.navigate(['courses']);
  }

  private initializeForm(): void {
    this.course = defaultCourse;
    const { name, description, length, date, authors } = this.course;
    this.form = this.fb.group({
      name: new FormControl(name, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(description, [Validators.required, Validators.maxLength(500)]),
      length: new FormControl(length, [Validators.required]),
      date: new FormControl(this.formatDate(date), [Validators.required]),
      authors: new FormControl(authors, Validators.required)
    });
  }

  private formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  private stringToDate(value: string): string {
    const dateParts: string[] = value.split('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Date(+dateParts[2], (dateParts[1] as any) - 1, +dateParts[0]).toISOString();
  }

}
