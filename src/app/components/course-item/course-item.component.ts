import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Output() public deletedItem: EventEmitter<string> = new EventEmitter<string>();
  @Input() public item: ICourse;
  constructor() { }

  public handleDelete(itemTitle: string): void {
    this.deletedItem.emit(itemTitle);
  }

  public ngOnInit(): void {
  }

}
