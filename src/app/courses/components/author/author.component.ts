import { IAuthors } from './../../../shared/models/course';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {

  @Input() public author: IAuthors;
  @Output() public deleteAuthorEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public handleDelete(id: string): void {
    this.deleteAuthorEvent.emit(id);
  }
}
