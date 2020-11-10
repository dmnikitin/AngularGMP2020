import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/shared/models/course';
import { AddItemModalComponent } from '../add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-course-controls',
  templateUrl: './course-controls.component.html',
  styleUrls: ['./course-controls.component.scss']
})
export class CourseControlsComponent implements OnInit {

  @Output() public searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sortEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public searchQuery: string;
  public isAscending: boolean;

  constructor(private dialog: MatDialog, private coursesService: CoursesService) { }

  public searchItems(): void {
    this.searchEvent.emit(this.searchQuery);
  }

  public sortItemsByDate(): void {
    this.sortEvent.emit(this.isAscending);
    this.isAscending = !this.isAscending;
  }

  public handleAddItem(): void {
    const dialogRef: MatDialogRef<AddItemModalComponent> = this.dialog.open(AddItemModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.coursesService.createItem();
      }
    });
  }

  public ngOnInit(): void {
    this.searchQuery = '';
    this.isAscending = false;
  }
}
