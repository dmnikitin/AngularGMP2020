import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthors } from 'src/app/shared/models/course';
import { authorsUrl } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public dropdownOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  public getAuthors(textFragment: string): Observable<IAuthors[]> {
    const params: HttpParams = new HttpParams()
      .append('textFragment', textFragment ? textFragment : '');
    return this.http.get<IAuthors[]>(authorsUrl, {params});
  }
}
