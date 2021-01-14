import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-course-controls',
  templateUrl: './course-controls.component.html',
  styleUrls: ['./course-controls.component.scss']
})
export class CourseControlsComponent implements OnInit {

  @Output() public sortEvent: EventEmitter<string> = new EventEmitter<string>();

  public sortingValue: string;
  public route: string = '/courses/new';
  public form: FormGroup;

  constructor(private coursesService: CoursesService, private fb: FormBuilder) { }

  public updateQuery(value: string): void {
    this.coursesService.searchQuery.next(value);
  }

  public sortItems(): void {
    this.sortEvent.emit(this.sortingValue);
    this.sortingValue = this.sortingValue === 'length' ? 'date' : 'length';
  }

  public ngOnInit(): void {
    this.sortingValue = 'date';
    this.form = this.fb.group({ search: new FormControl('') });
  }
}
