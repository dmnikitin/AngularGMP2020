import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  public courses: Observable<Course[]>;

  constructor(
    // private orderByPipe: OrderByPipe,
    // private filterPipe: FilterPipe,
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

  public onItemsSort(isAscending: boolean): void {
    // const coursesList: Array<Course> = this.coursesService.getList();
    // this.courses = this.orderByPipe.transform(coursesList, isAscending);
    const sortingValue: string = isAscending ? 'date' : '';
    this.courses = this.coursesService.getList(3, 3, sortingValue);
  }

  public onItemsSearch(filteringValue: string): void{
    // const coursesList: Array<Course> = this.coursesService.getList();
    // this.courses = this.filterPipe.transform(coursesList, filteringValue);
    this.courses = this.coursesService.getList(3, 3, undefined, filteringValue);
  }

  public loadMore(): void {
    // console.log('load more');
    this.courses = this.coursesService.getList(3, 3);
  }

  public ngOnInit(): void {
    this.courses = this.coursesService.getList(0, 3);
  }
}
