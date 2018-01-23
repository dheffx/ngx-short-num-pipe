import { Pipe, PipeTransform } from '@angular/core';

//inspired by
//https://stackoverflow.com/questions/17633462/format-a-javascript-number-with-a-metric-prefix-like-1-5k-1m-1g-etc

@Pipe({name: 'shortnum'})
export class ShortNumPipe implements PipeTransform {
  ranges = [
    { divider: 1e12 , suffix: 'T' },
    { divider: 1e9 , suffix: 'B' },
    { divider: 1e6 , suffix: 'M' },
    { divider: 1e3 , suffix: 'K' }
  ]

  transform(value: number): string {
    return value ? this.shorten(value) : ""
  }

  shorten(n: number): string {
    if (n < 0) {
      return '-' + this.shorten(-n);
    }
    for (let i = 0; i < this.ranges.length; i++) {
      if (n >= this.ranges[i].divider) {
        return (n / this.ranges[i].divider).toFixed(2) + this.ranges[i].suffix;
      }
    }
    return n.toFixed(2)
  }
}
