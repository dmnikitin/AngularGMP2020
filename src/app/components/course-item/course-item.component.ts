import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent  {
  @Output() public deletedItemEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() public item: ICourse;

  constructor() { }

  public handleDelete(itemId: string): void {
    this.deletedItemEvent.emit(itemId);
  }
}
