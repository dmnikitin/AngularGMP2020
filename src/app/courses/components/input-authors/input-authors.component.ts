import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-authors',
  templateUrl: './input-authors.component.html',
  styleUrls: ['./input-authors.component.scss']
})
export class InputAuthorsComponent implements OnInit {

  constructor() { }
  public authors: string;

  public ngOnInit(): void {
  }

}
