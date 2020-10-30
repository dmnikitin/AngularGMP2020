import { Injectable } from '@angular/core';
import { Course } from '../../models/course';
import { mockCourses } from 'src/assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesArray: Array<Course> = Array.from(mockCourses);

  public get courses(): Array<Course> {
    return this.coursesArray;
  }

  public set courses(newCourses: Array<Course>) {
    this.coursesArray = newCourses;
  }

  constructor() { }

  public getList(): Array<Course>{
    return this.courses;
  }

  public getItemById(id: string): Course {
    return this.courses.find((course)=> course.id === id );
  }

  public updateItem(id: string, newData: Course): void {
    this.courses = this.courses.map((item) => {
      if (item.id === id) {
        return newData;
      }
    });
  }
  public removeItem(id: string): void {
    this.courses = this.courses.filter((item) => item.id !== id);
  }
}