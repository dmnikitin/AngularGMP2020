import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-authors',
  templateUrl: './input-authors.component.html',
  styleUrls: ['./input-authors.component.scss']
})
export class InputAuthorsComponent implements OnInit {

  @Input() public authors: string;
  @Output() public authorsChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void {
  }

  public onAuthorsChange(model: string): void {
    this.authorsChange.emit(model);
    this.authors = model;
  }

}
