import { Course } from 'src/app/shared/models/course';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  public transform(items: Course[], filteringValue: string): Course[] {
    if (!items || !filteringValue) {
      return items;
    }
    return items.filter((item: Course) => item.title.toLowerCase().includes(filteringValue));
  }

}
