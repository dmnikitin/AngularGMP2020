import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { CoursesService } from 'src/app/core/services/courses.service';
import { defaultCoursesCount } from 'src/assets/variables';
import { debounceTime, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { CoursesState } from 'src/app/core/store/state/courses.state';
import { deleteCourse, getCourses } from './../../../core/store/actions/courses.actions';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  private searchSubscription: Subscription;
  private page: number;

  public courses$: Observable<CoursesState>;

  constructor(
    private store: Store<{ courses: CoursesState }>,
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) {
    this.courses$ = store.pipe(select('courses'));
  }

  public onItemDelete(id: number): void {
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed()
      .pipe(
        take(1),
        switchMap(result => {
          if (result) {
            this.store.dispatch(deleteCourse({ id }));
            this.store.dispatch(getCourses({ start: this.page, count: defaultCoursesCount }));
          }
          return EMPTY;
        })).subscribe();
  }

  public onItemsSort(sort: string): void {
    this.store.dispatch(getCourses({ sort }));
  }

  public loadMore(): void {
    this.page += 1;
    this.store.dispatch(getCourses({ start: this.page, count: defaultCoursesCount }));
  }

  public ngOnInit(): void {
    this.page = 0;
    this.store.dispatch(getCourses({ start: this.page, count: defaultCoursesCount }));
    this.searchSubscription = this.coursesService.searchQuery.pipe(
      debounceTime(2000),
      tap(textFragment => {
        if (textFragment.length > 2) {
          this.store.dispatch(getCourses({ textFragment }));
        }
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
