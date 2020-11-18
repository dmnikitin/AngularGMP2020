import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {

  public title: string;
  public description: string;
  public duration: string;
  public createdAt: string;
  public authors: string;

  constructor() { }

  public ngOnInit(): void {
  }

  public handleReturn(): void {
    console.log('return');
  }

  public handleAddCourse(): void {
    console.log('addCourse');
  }

}
