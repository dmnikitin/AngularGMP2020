import { Course } from 'src/app/shared/models/course';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  public transform(items: Course[], isAscending: boolean): Course[] {
    if (!items) {
      return items;
    }

    return items.sort((first: Course, second: Course) =>
      isAscending
        ? Date.parse(first.creationDate) - Date.parse(second.creationDate)
        : Date.parse(second.creationDate) - Date.parse(first.creationDate)
    );
  }
}

