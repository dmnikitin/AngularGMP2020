import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { mockCourses } from 'src/assets/mock-data';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public courses: Array<Course>;
  constructor() { }

  public onItemDelete(itemId: string): void {
    console.log('item Id: ', itemId);
  }

  public onLoadMore(): void {
    console.log('load more');
  }

  public ngOnInit(): void {
    this.courses = mockCourses.map(({ id, title, creationDate, duration, description, rated }: Course) =>
      new Course( id, title, creationDate, duration, description, rated ));
  }

}
