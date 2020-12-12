import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';
import { defaultCoursesCount } from 'src/assets/variables';
import { debounceTime, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  public courses: Observable<Course[]>;
  private searchSubscription: Subscription;
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

  public loadMore(): void {
    this.page += 1;
    this.courses = this.coursesService.getList(this.page, defaultCoursesCount);
  }

  public ngOnInit(): void {
    this.page = 0;
    this.courses = this.coursesService.getList(this.page, defaultCoursesCount);
    this.searchSubscription = this.coursesService.searchQuery
      .pipe(
        debounceTime(2000),
        tap((query: string) => {
          if (query.length > 2) {
            this.courses = this.coursesService.getList(null, null, null, query);
          }
        })
      ).subscribe();
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
