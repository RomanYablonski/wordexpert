import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'english'
})

export class EnglishPipe implements PipeTransform {
  transform(value: string, wordSuccesses: number): any {
    const arr = value.split('');
    const wordsArr = value.split(' ');
    const cutter = wordSuccesses > 2 ? 0 : 1;
    for (let i = cutter; i < arr.length - cutter; i++) {
      arr[i] = ' _ ';
    }
    if (wordsArr.length > 1) {
      return arr.join('') + ' (' + arr.length + ') ' + ' (' + wordsArr.length + ') ';
    } else {
      return arr.join('') + ' (' + arr.length + ') ';
    }
  }
}
