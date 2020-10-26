import { ICourse } from './../models/course';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  public transform(items: ICourse[], isAscending: boolean): ICourse[] {
    if (!items) {
      return items;
    }

    return items.sort((first: ICourse, second: ICourse) =>
      isAscending
        ? Date.parse(second.creationDate) - Date.parse(first.creationDate)
        : Date.parse(first.creationDate) - Date.parse(second.creationDate)
    );
  }
}

