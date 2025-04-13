import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salesStatus'
})
export class SalesStatusPipe implements PipeTransform {
  transform(salesCount: number): string {
    switch (true) {
      case salesCount >= 200:
        return 'Felkapott';
      case salesCount >= 50:
        return 'Népszerű';
      default:
        return 'Keveset vásárolták';
    }
  }
}