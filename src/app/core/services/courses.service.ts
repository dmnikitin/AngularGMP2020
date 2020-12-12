import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Course } from 'src/app/shared/models/course';
import { coursesUrl } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  public searchQuery: Subject<string> = new Subject();

  constructor(private http: HttpClient) { }

  public getList(start?: number, count?: number, sort?: string, textFragment?: string): Observable<Course[]>{
    const params: HttpParams = new HttpParams()
      .append('start', start ? start.toString() : '')
      .append('count', count ? count.toString() : '')
      .append('sort', sort ? sort : '')
      .append('textFragment', textFragment ? textFragment : '');
    return this.http.get<Course[]>(coursesUrl, {params});
  }

  public getItemById(id: number):  Observable<Course> {
    return this.http.get<Course>(`${coursesUrl}/${id}`);
  }

  public updateItem(id: number, course: Course): Observable<Course> {
    return this.http.patch<Course>(`${coursesUrl}/${id}`, course);
  }
  public removeItem(id: number): Observable<Course> {
    return this.http.delete<Course>(`${coursesUrl}/${id}`);
  }

  public createItem(item: Course): Observable<Course> {
    return this.http.post<Course>(coursesUrl, item);
  }

}
