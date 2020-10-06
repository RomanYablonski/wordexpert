import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'english'
})

export class EnglishPipe implements PipeTransform {
  transform(value: string, wordSuccesses?: number): any {
    const arr = value.split('');
    const wordsArr = value.split(' ');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = ' _ ';
    }
    if (wordsArr.length > 1) {
      return arr.join('') + ' (' + arr.length + ') ' + ' (' + wordsArr.length + ') ';
    } else {
      return arr.join('') + ' (' + arr.length + ') ';
    }
  }
}
