import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-controls',
  templateUrl: './course-controls.component.html',
  styleUrls: ['./course-controls.component.scss']
})
export class CourseControlsComponent implements OnInit {

  public searchQuery: string;

  constructor() { }

  public showQuery(): void {
    console.log('______________________________query is: ', this.searchQuery);
  }

  public ngOnInit(): void {
    this.searchQuery = '';
  }

}
