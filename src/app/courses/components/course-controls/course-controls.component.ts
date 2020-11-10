import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CoursesService } from 'src/app/core/services/courses.service';

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

  constructor(private coursesService: CoursesService) { }

  public searchItems(): void {
    this.searchEvent.emit(this.searchQuery);
  }

  public sortItemsByDate(): void {
    this.sortEvent.emit(this.isAscending);
    this.isAscending = !this.isAscending;
  }

  public ngOnInit(): void {
    this.searchQuery = '';
    this.isAscending = false;
  }
}
