import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  public transform(value: number): string {
    const hours: number = Math.floor(value/60);
    const minutes: number = hours>0 ? value - 60*hours : value;
    const hoursString: string = hours ? `${hours}h ` : '';
    const minutesString: string = minutes ? `${minutes}min` : '';
    return `${hoursString}${minutesString}`;
  }
}
