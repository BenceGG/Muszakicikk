import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
  transform(name: { firstname: string; lastname: string }): string {
    if (!name) return '';
    const first = name.firstname ? name.firstname.charAt(0).toUpperCase() : '';
    const last = name.lastname ? name.lastname.charAt(0).toUpperCase() : '';
    return first + last;
  }
}