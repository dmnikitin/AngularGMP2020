import { Component, OnInit } from '@angular/core';
import { ICourse, Course } from 'src/app/models/course';
import { mockCourses } from 'src/assets/mock-data';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public courses: Array<ICourse>;

  constructor() { }

  public ngOnInit(): void {
    this.courses = mockCourses.map( course => {
      const { id, title, createdAt, duration, description } = course;
      return new Course( id, title, createdAt, duration, description );
    });
  }

}
