import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-controls',
  templateUrl: './course-controls.component.html',
  styleUrls: ['./course-controls.component.scss']
})
export class CourseControlsComponent implements OnInit {

  @Output() public searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sortEvent: EventEmitter<string> = new EventEmitter<string>();

  public searchQuery: string;
  public sortingValue: string;

  public route: string = '/courses/new';

  constructor() { }

  public searchItems(): void {
    this.searchEvent.emit(this.searchQuery);
  }

  public sortItems(): void {
    this.sortEvent.emit(this.sortingValue);
    this.sortingValue = this.sortingValue === 'length' ? 'date' : 'length';
  }

  public ngOnInit(): void {
    this.searchQuery = '';
    this.sortingValue = 'date';
  }
}
