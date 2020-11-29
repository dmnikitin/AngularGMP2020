import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';
import { defaultCoursesCount } from 'src/assets/variables';

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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.removeItem(itemId);
        this.courses = this.coursesService.getList();
      }
    });
  }

  public onItemsSort(sortingValue: string): void {
    this.courses = this.coursesService.getList(this.page, defaultCoursesCount, sortingValue);
  }

  public onItemsSearch(filteringValue: string): void{
    this.courses = this.coursesService.getList(this.page, defaultCoursesCount , null, filteringValue);
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
