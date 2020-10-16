/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnDestroy
} from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, OnChanges, DoCheck, OnDestroy,
  AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked {

  @Output() public deletedItem: EventEmitter<string> = new EventEmitter<string>();
  @Input() public item: ICourse;
  constructor() { }

  public handleDelete(itemTitle: string): void {
    this.deletedItem.emit(itemTitle);
  }

  public ngOnInit(): void {
    console.log('onInit item id: ', this.item.id);
  }

  public ngOnChanges(): void {
    console.log('onChanges item id: ', this.item.id);
  }

  public ngDoCheck(): void {
    console.log('doCheck item id: ', this.item.id);
  }

  public ngAfterContentInit(): void {
    console.log('afterContentInit item id: ', this.item.id);
  }

  public ngAfterViewInit(): void {
    console.log('afterViewInit item id: ', this.item.id);
  }

  public ngAfterContentChecked(): void {
    console.log('afterContentChecked item id: ', this.item.id);
  }

  public ngAfterViewChecked(): void {
    console.log('afterViewChecked item id: ', this.item.id);
  }

  public ngOnDestroy(): void {
    console.log('onDestroy item id: ', this.item.id);
  }

}
