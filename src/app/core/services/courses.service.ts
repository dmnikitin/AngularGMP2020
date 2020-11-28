import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { mockCourses } from 'src/assets/mock-data';
import { Course } from 'src/app/shared/models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private coursesArray: Array<Course> = Array.from(mockCourses);

  // public get courses(): Array<Course> {
  //   return this.coursesArray;
  // }

  // public set courses(newCourses: Array<Course>) {
  //   this.coursesArray = newCourses;
  // }

  constructor( private http: HttpClient) { }

  public getList(start?: number, count?: number, sort?: string, textFragment?: string): Observable<Course[]>{
    // return this.courses;
    const params: HttpParams = new HttpParams();
    params.set('start', start.toString());
    params.set('count', count.toString());
    params.set('sort', sort);
    params.set('textFragment', textFragment);
    return this.http.get<Course[]>('http://localhost:3004/courses', {params});
  }

  public getItemById(id: number):  Observable<Course> {
    // return this.courses.find((course)=> course.id === id );
    return this.http.get<Course>(`http://localhost:3004/courses/${id}`);
  }

  public updateItem(id: number, newData: Course): Observable<Course> {
    // this.courses = this.courses.map((item) => {
    //   if (item.id === id) {
    //     return newData;
    //   } else {
    //     return item;
    //   }
    // });
    return this.http.patch<Course>('http://localhost:3004/courses', {id, course: newData});
  }
  public removeItem(id: number): Observable<Course> {
    // this.courses = this.courses.filter((item) => item.id !== id);
    return this.http.delete<Course>(`http://localhost:3004/courses/${id}`);
  }

  public createItem(item: Course): Observable<Course> {
    // this.courses.push(item);
    const headers: { item: Course } = { item };
    return this.http.post<Course>('http://localhost:3004/courses', headers);
  }
}
