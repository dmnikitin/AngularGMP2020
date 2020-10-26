import { ICourse } from './../models/course';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  public transform(items: ICourse[], filteringValue: string): ICourse[] {
    if (!items || !filteringValue) {
      return items;
    }
    return items.filter((item: ICourse) => item.title.toLowerCase().includes(filteringValue));
  }

}
