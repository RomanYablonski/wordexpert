import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'english'
})

export class EnglishPipe implements PipeTransform {
  transform(value: string): any {
    const arr = value.split('');
    for (let i = 1; i < arr.length - 1; i++) {
      arr[i] = ' _ ';
    }
    return arr.join('') + ' (' + arr.length + ') ';
  }
}
