import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';
import { defaultCoursesCount } from 'src/assets/variables';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public courses: Observable<Course[]>;
  private page: number;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) { }

  public onItemDelete(itemId: number): void {
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed()
      .pipe(
        take(1),
        switchMap(result => {
          if (result) {
            return this.coursesService.removeItem(itemId).pipe(
              tap(() => {
                this.courses = this.coursesService.getList(this.page, defaultCoursesCount);
              })
            );
          }
          return EMPTY;
        })).subscribe();
  }

  public onItemsSort(sortingValue: string): void {
    this.courses = this.coursesService.getList(null, null, sortingValue);
  }

  public onItemsSearch(filteringValue: string): void{
    this.courses = this.coursesService.getList(null, null , null, filteringValue);
  }

  public loadMore(): void {
    this.page += 1;
    this.courses = this.coursesService.getList(this.page, defaultCoursesCount);
  }

  public ngOnInit(): void {
    this.page = 0;
    this.courses = this.coursesService.getList(this.page, defaultCoursesCount);
  }
}
