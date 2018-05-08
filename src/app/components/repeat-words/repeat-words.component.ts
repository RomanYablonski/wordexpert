import {Component, OnInit} from '@angular/core';
import {WordService} from '../../shared/services/word.service';
import {LearnWordsComponent} from '../learn-words/learn-words.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-repeat-words',
  templateUrl: './repeat-words.component.html',
  styleUrls: ['./repeat-words.component.sass']
})
export class RepeatWordsComponent extends LearnWordsComponent implements OnInit {
  public currentDate = new Date();

  constructor(public wordService: WordService,
              public sanitizer: DomSanitizer) {
    super(wordService, sanitizer);
  }

  ngOnInit() {
    this.wordService.getWords()
      .subscribe((words) => {
        this.repeatFilter(words);
        this.makeRandomization(this.ProgressWordsList);
        console.log(this.ProgressWordsList);
      });
  }

  public repeatFilter(words) {
    words.forEach((word) => {
      const dateDifference = (+this.currentDate - +new Date(word.date)) / 86400000;
      if (word.status === 'on-repeat') {
        if ((dateDifference > 6 && word.successes < 1) || (dateDifference > 13 && word.successes < 2) || (dateDifference > 20 && word.successes < 3) || (dateDifference > 27 && word.successes < 4) || (dateDifference > 34 && word.successes < 5)) {
          this.ProgressWordsList.push(word);
        }
      }
    });
  }

  public checkWord(answer) {
    const currentWord = this.currentWord;
    if (answer === this.currentWord.english) {
      this.correct = true;
      this.correctAnswers++;
      currentWord.successes++;
      if (currentWord.successes > 4) {
        currentWord.status = 'learned-new';
        currentWord.successes = 0;
      }
    } else {
      this.mistake = true;
      this.mistakeAnswers++;
      currentWord.status = 'queue';
      currentWord.successes = 0;
    }
    currentWord.date = new Date();
    this.wordService.updateWord(currentWord).subscribe((responce) => {
      console.log(responce);
    });
  }

}