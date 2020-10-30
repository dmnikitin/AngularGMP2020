import { CoursesService } from '../../../core/services/courses.service';
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

  public courses: Array<Course>;

  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterPipe,
    private coursesService: CoursesService
  ) { }

  public onItemDelete(itemId: string): void {
    this.coursesService.removeItem(itemId);
    this.courses = this.coursesService.getList();
  }

  public onLoadMore(): void {
    console.log('load more');
  }

  public onItemsSort(isAscending: boolean): void {
    const coursesList: Array<Course> = this.coursesService.getList();
    this.courses = this.orderByPipe.transform(coursesList, isAscending);
  }

  public onItemsSearch(filteringValue: string): void{
    const coursesList: Array<Course> = this.coursesService.getList();
    this.courses = this.filterPipe.transform(coursesList, filteringValue);
  }

  public ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }
}
