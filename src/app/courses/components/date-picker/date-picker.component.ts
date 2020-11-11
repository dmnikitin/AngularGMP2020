import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input() public createdAt: string;
  @Output() public createdAtChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void {
  }

  public onCreationDateChange(model: string): void {
    this.createdAtChange.emit(model);
    this.createdAt = model;
  }
}
