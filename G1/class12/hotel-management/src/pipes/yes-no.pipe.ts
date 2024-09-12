import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
  standalone: true,
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    switch (value) {
      case true:
        return 'Yes';
      case false:
        return 'No';
      default:
        return '';
    }
  }
}
