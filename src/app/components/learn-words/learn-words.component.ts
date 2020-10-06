import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WordService} from '../../shared/services/word.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-learn-words',
  templateUrl: './learn-words.component.html',
  styleUrls: ['./learn-words.component.sass']
})
export class LearnWordsComponent implements OnInit {

  @ViewChild('answer') answer: ElementRef;

  public QueueWordsList = [];
  public ProgressWordsList = [];
  public IncorrectWords = [];
  public currentWordIndex = 1;
  public correct;
  public correctAnswers = 0;
  public mistake;
  discrepancy = false;
  public mistakeAnswers = 0;
  public inputLength = 0;
  public finish = false;


  constructor(public wordService: WordService,
              public sanitizer: DomSanitizer,
              public location: Location) {
  }

  ngOnInit() {
    this.wordService.getWords()
      .pipe(take(1))
      .subscribe((words) => {
        this.progressQueueFilter(words);
        if (this.ProgressWordsList.length < 30) {
          this.addFromQueue();
        }
        this.makeRandomization(this.ProgressWordsList);
      });
  }

  public progressQueueFilter(words) {
    words.forEach((word) => {
      if (word.status === 'queue') {
        this.QueueWordsList.push(word);
      } else if (word.status === 'in-progress') {
        this.ProgressWordsList.push(word);
      }
    });
  }

  public addFromQueue() {
    this.makeRandomization(this.QueueWordsList);
    const length = this.ProgressWordsList.length;
    for (let i = 1; i <= 30 - length; i++) {
      const queueWordsListLength = this.QueueWordsList.length;
      const word = this.QueueWordsList[queueWordsListLength - 1];
      if (word) {
        word.status = 'in-progress';
        word.successes = 0;
        this.wordService.updateWord(word);
        this.ProgressWordsList.push(word);
        this.QueueWordsList.pop();
      } else {
        break;
      }
    }
  }

  public get currentWord() {
    if (this.ProgressWordsList.length > 0) {
      return this.ProgressWordsList[this.currentWordIndex - 1];
    } else {
      return {
        english: 'loading',
        russian: 'loading',
        status: 'loading',
        index: 'loading'
      };
    }
  }

  public checkWord(answer: string, isFinal: boolean) {
    const currentWord = this.currentWord;
    if (String(answer).toLowerCase() === this.currentWord.english.toLowerCase()) {
      this.correct = true;
      this.correctAnswers++;
      currentWord.successes++;
      if (currentWord.successes > 3) {
        if (currentWord.wasMistaked) {
          currentWord.status = 'on-repeat';
        } else {
          currentWord.status = 'learned-new';
        }
        currentWord.successes = 0;
        currentWord.date = new Date();
      }
    } else if (isFinal) {
      this.mistake = true;
      this.mistakeAnswers++;
      currentWord.successes = currentWord.successes > 0 ? 0 : currentWord.successes - 0.5;
      currentWord.wasMistaked = true;
      this.IncorrectWords.push(currentWord);
    } else {
      this.discrepancy = answer.length >= this.currentWord.english.length;
    }
    this.wordService.updateWord(currentWord);
  }

  public get wasAnswered() {
    return this.correct || this.mistake;
  }

  public reset() {
    this.correct = null;
    this.mistake = null;
    this.discrepancy = null;
    this.answer.nativeElement.value = '';
  }

  public nextWord() {
    this.reset();
    if (this.currentWordIndex < this.ProgressWordsList.length) {
      this.currentWordIndex++;
    } else {
      this.finish = true;
    }
  }

  public onKeyUp(value: string) {
    this.inputLength = this.answer.nativeElement.value.length;
    this.checkWord(value, false)
  }

  public onEnter(value: string) {
    if (!this.wasAnswered) {
      this.checkWord(value, true);
    } else {
      this.nextWord();
    }
  }

  public get allAnswers() {
    return this.correctAnswers + this.mistakeAnswers;
  }

  public get wordStatus() {
    return this.currentWord.status;
  }

  public get wordSuccesses() {
    return this.currentWord.successes;
  }

  public get inProgress() {
    return this.ProgressWordsList.length;
  }

  public get inQueue() {
    return this.QueueWordsList.length;
  }

  public get frameUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://dictionary.cambridge.org/dictionary/english/${this.currentWord.english}`);
  }

  public makeRandomization(arr) {
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * arr.length);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // onFrameLoad() {
  //   setTimeout(() => this.answer.nativeElement.focus, 1000);
  // }
}
