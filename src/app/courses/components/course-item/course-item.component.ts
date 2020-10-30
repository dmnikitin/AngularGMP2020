import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from 'src/app/models/course';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent  {
  @Output() public deletedItemEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() public item: ICourse;

  constructor(private dialog: MatDialog) { }

  public handleDelete(itemId: string): void {
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletedItemEvent.emit(itemId);
      }
    });
  }

}
