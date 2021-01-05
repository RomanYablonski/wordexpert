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
  @ViewChild('russianInput') russianInput: ElementRef;
  @ViewChild('englishInput') englishInput: ElementRef;

  QueueWordsList = [];
  ProgressWordsList = [];
  IncorrectWords = [];
  currentWordIndex = 1;
  correct;
  correctAnswers = 0;
  mistake;
  discrepancy = false;
  mistakeAnswers = 0;
  inputLength = 0;
  finish = false;
  editMode = false;

  constructor(protected wordService: WordService,
              protected sanitizer: DomSanitizer,
              protected location: Location) {
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

  progressQueueFilter(words) {
    words.forEach((word) => {
      if (word.status === 'queue') {
        this.QueueWordsList.push(word);
      } else if (word.status === 'in-progress') {
        this.ProgressWordsList.push(word);
      }
    });
  }

  addFromQueue() {
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

  get currentWord() {
    if (this.ProgressWordsList.length > 0) {
      return this.ProgressWordsList[this.currentWordIndex - 1];
    } else {
      return {
        english: 'loading',
        russian: 'loading',
        status: 'loading',
        key: '0'
      };
    }
  }

  checkWord(answer: string) {
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
    } else {
      this.mistake = true;
      this.mistakeAnswers++;
      currentWord.successes = currentWord.successes > 0 ? 0 : currentWord.successes - 0.5;
      currentWord.wasMistaked = true;
      this.IncorrectWords.push(currentWord);
    }
    this.wordService.updateWord(currentWord);
  }

  checkDiscrepancy(answer: string) {
    if (String(answer).toLowerCase() !== this.currentWord.english.toLowerCase()) {
      this.discrepancy = answer.length >= this.currentWord.english.length;
    }
  }

  get wasAnswered() {
    return this.correct || this.mistake;
  }

  reset() {
    this.correct = null;
    this.mistake = null;
    this.discrepancy = null;
    this.answer.nativeElement.value = '';
  }

  nextWord() {
    this.reset();
    if (this.currentWordIndex < this.ProgressWordsList.length) {
      this.currentWordIndex++;
    } else {
      this.finish = true;
    }
  }

  onKeyUp(value: string) {
    this.inputLength = this.answer.nativeElement.value.length;
    this.checkDiscrepancy(value)
  }

  onEnter(value: string) {
    if (!this.wasAnswered) {
      this.checkWord(value);
    } else {
      this.nextWord();
    }
  }

  get allAnswers() {
    return this.correctAnswers + this.mistakeAnswers;
  }

  get wordStatus() {
    return this.currentWord.status;
  }

  get wordSuccesses() {
    return this.currentWord.successes;
  }

  get inProgress() {
    return this.ProgressWordsList.length;
  }

  get inQueue() {
    return this.QueueWordsList.length;
  }

  get frameUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://dictionary.cambridge.org/dictionary/english/${this.currentWord.english}`);
  }

  makeRandomization(arr) {
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * arr.length);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  enableEditMode() {
    if (!this.wasAnswered) {
      return
    }
    this.editMode = true;
  }

  onSave() {
    const word = {
      ...this.currentWord,
      russian: this.russianInput.nativeElement.value,
      english: this.englishInput.nativeElement.value,
    };
    this.wordService.updateWord(word).then(res => {
      const currentWord = this.currentWord;
      Object.assign(currentWord, word);
      this.editMode= false;
      console.log(this.currentWord);
    })
  }
}
