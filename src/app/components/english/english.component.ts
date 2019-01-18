import {Component, OnInit} from '@angular/core';
import {WordService} from '../../shared/services/word.service';
import {Word} from '../../shared/models/word.model';

@Component({
  selector: 'english',
  templateUrl: 'english.component.html',
  styleUrls: ['english.component.sass']
})

export class EnglishComponent implements OnInit {
  public index = 0;
  public queueWords: Word[];
  constructor(private wordService: WordService) {
  }

  ngOnInit() {
    this.getAndPrepareWords();
    this.findSimilarWords();
  }

  getAndPrepareWords() {
    this.wordService.getWords()
      .subscribe(words => {
        const queueWords = words.filter(word => {
          if (word.status === 'on-repeat' && word.englishStatus !== 'checked') {
            if (!word.englishStatus) {
              word.englishStatus = 'queue';
              this.wordService.updateWord(word);
            }
            return word.englishStatus = 'queue';
        }
        });
        for (let i = 0; i < queueWords.length; i++) {
          const randNumber = Math.floor(Math.random() * queueWords.length);
          [queueWords[i], queueWords[randNumber]] = [queueWords[randNumber], queueWords[i]]
        }
        this.queueWords = queueWords
      });
  }

  findSimilarWords() {
    this.wordService.getWords()
      .subscribe(words => {
        const scores = [];
        words.forEach((word) => {
          const currentWord = this.queueWords[this.index];
          let score = 0;
          if (word.english === currentWord.english || word.russian === currentWord.russian) {
            scores.push(score);
            return;
          }

          if (word.english.length === currentWord.english.length)  {
            score++;
          }

          if (word.english[0] === currentWord.english[0])  {
            if (word.english[1] === currentWord.english[1])  {
              score++;
            }
            score++;
          }

          if (word.english[word.english.length - 1] === currentWord.english[currentWord.english.length - 1])  {
            if (word.english[word.english.length - 2] === currentWord.english[currentWord.english.length - 2])  {
              score++;
            }
            score++;
          }

          scores.push({word, score});
        });
        console.log(scores.sort((a,b) => b.score - a.score));
      })
  }


}
