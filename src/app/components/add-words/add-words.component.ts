import { Component, OnInit } from '@angular/core';
import { WordService } from '../../shared/services/word.service';
import {Word} from '../../shared/models/word.model';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.sass']
})
export class AddWordsComponent {

  constructor(private wordService: WordService) { }

  public addWords(words) {
    words.split('\t\n').map((word) => {
      const duple =  word.split(' - ');
      this.wordService.addWord({
        english: duple[0],
        russian: duple[1],
        status: 'not-checked',
        id: this.wordService.lastWords.length
      })
    });
  }
}
