import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-duration',
  templateUrl: './input-duration.component.html',
  styleUrls: ['./input-duration.component.scss']
})
export class InputDurationComponent implements OnInit {

  @Input() public duration: string;
  @Output() public durationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnInit(): void {
  }
  public onDurationChange(model: string): void {
    this.durationChange.emit(model);
    this.duration = model;
  }

}
