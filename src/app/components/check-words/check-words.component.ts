import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WordService} from '../../shared/services/word.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.sass']
})
export class CheckWordsComponent implements OnInit {

  @ViewChild('answer') answer: ElementRef;

  public wordsList = [];
  public currentWordIndex = 1;
  public correct;
  public mistake;
  public learned = 0;
  public queue = 0;
  public inProgress = 0;
  public notChecked = 0;
  public onRepeat = 0;
  public allWordsCount = 0;
  public inputLength = 0;
  public learnedNew = 0;


  constructor(private wordService: WordService) {
  }

  ngOnInit() {
    this.wordService.getWords()
      .pipe(take(1))
      .subscribe((words) => {
        this.allWordsCount = words.length;
        const wordsList = [];
        words.forEach((word) => {
          if (word.status === 'learned') {
            this.learned++;
          } else if (word.status === 'queue') {
            this.queue++;
          } else if (word.status === 'in-progress') {
            this.inProgress++;
          } else if (word.status === 'on-repeat') {
            this.onRepeat++;
          } else if (word.status === 'learned-new') {
            this.learnedNew++;
          } else if (word.status === 'not-checked') {
            this.notChecked++;
            wordsList.push(word);
          }
        });
        for (let i = 0; i < wordsList.length; i++) {
          const j = Math.floor(Math.random() * wordsList.length);
          [wordsList[i], wordsList[j]] = [wordsList[j], wordsList[i]];
        }
        this.wordsList = wordsList;
      });
  }

  public get currentWord() {
    if (this.wordsList.length > 0) {
      return this.wordsList[this.currentWordIndex - 1];
    } else {
      return {
        english: 'loading',
        russian: 'loading',
        status: 'loading',
        index: 'loading'
      };
    }
  }

  public checkWord(answer) {
    const currentWord = this.currentWord;
    if (String(answer).toLowerCase() === this.currentWord.english.toLowerCase()) {
      this.correct = true;
      this.learned++;
      currentWord.status = 'learned';
    } else {
      this.mistake = true;
      this.queue++;
      currentWord.status = 'queue';
    }
    this.notChecked--;
    this.wordService.updateWord(currentWord);
  }

  public get wasAnswered() {
    return this.correct || this.mistake;
  }

  public reset() {
    this.correct = null;
    this.mistake = null;
    this.answer.nativeElement.value = '';
  }

  public nextWord() {
    this.reset();
    this.currentWordIndex++;
  }

  public get success() {
    return ((this.allWordsCount - this.notChecked) * 100 / this.allWordsCount).toFixed(2) + '%';
  }

  public get rCoefficient() {
    return (this.learned * 100 / (this.allWordsCount - this.notChecked)).toFixed(2) + '%';
  }

  public onKeyUp() {
    this.inputLength = this.answer.nativeElement.value.length;
  }

  public onEnter(value) {
    if (!this.wasAnswered) {
      this.checkWord(value);
    } else {
      this.nextWord();
    }
  }

  public get lnor() {
    return this.onRepeat + this.learnedNew;
  }

}
