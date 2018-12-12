import {Component, OnInit} from '@angular/core';
import {WordService} from '../../shared/services/word.service';

@Component({
  selector: 'english',
  templateUrl: 'english.component.html',
  styleUrls: ['english.component.sass']
})

export class EnglishComponent implements OnInit {
  public queueWords;
  constructor(private wordService: WordService) {
  }

  ngOnInit() {
    this.getAndPrepareWords();

  }

  getAndPrepareWords() {
    this.wordService.getWords()
      .subscribe(words => {
        const repeatWords = words.filter(word => word.status === 'on-repeat' && word.englishStatus !== 'checked' && word.englishStatus !== 'queue');
        const queueWords = words.filter(word => word.englishStatus === 'queue');
        for (let i = 0; i < repeatWords.length; i++) {
          const randNumber = Math.floor(Math.random() * repeatWords.length);
          [repeatWords[i], repeatWords[randNumber]] = [repeatWords[randNumber], repeatWords[i]]
        }
        console.log(repeatWords);
      });
  }


}
