import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() public item: ICourse;
  constructor() { }

  public ngOnInit(): void {
  }

}
