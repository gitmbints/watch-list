import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const ONE_HOUR: number = 60;
    let hour: number = 0;
    let minute: number = 0;

    while (value > ONE_HOUR) {
      hour += 1;
      value -= ONE_HOUR;
    }

    minute = value;

    if (hour < 1) {
      return `${minute}min`;
    }

    return `${hour}h ${minute}min`;
  }
}
