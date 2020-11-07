import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { mockCourses } from 'src/assets/mock-data';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [OrderByPipe, FilterPipe]
})
export class CoursesPageComponent implements OnInit {

  private coursesArray: Array<Course>;

  public get courses(): Array<Course> {
    return this.coursesArray;
  }

  public set courses(newCourses: Array<Course>) {
    this.coursesArray = newCourses;
  }

  public coursesToBeDisplayed: Array<Course>;

  constructor(private orderByPipe: OrderByPipe, private filterPipe: FilterPipe) { }

  public onItemDelete(itemId: string): void {
    console.log('item Id: ', itemId);
  }

  public onLoadMore(): void {
    console.log('load more');
  }

  public onItemsSort(isAscending: boolean): void {
    this.coursesToBeDisplayed = this.orderByPipe.transform(this.courses, isAscending);
  }

  public onItemsSearch(filteringValue: string): void{
    this.coursesToBeDisplayed = this.filterPipe.transform(this.courses, filteringValue);
  }

  public ngOnInit(): void {
    this.courses = mockCourses.map(({ id, title, creationDate, duration, description, rated }: Course) =>
      new Course( id, title, creationDate, duration, description, rated ));
    this.coursesToBeDisplayed = this.courses;
  }
}
