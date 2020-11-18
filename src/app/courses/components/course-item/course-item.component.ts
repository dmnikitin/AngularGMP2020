import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent  {
  @Output() public deletedItemEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() public item: Course;

  constructor() { }

  public handleDelete(itemId: string): void {
    this.deletedItemEvent.emit(itemId);
  }
}
