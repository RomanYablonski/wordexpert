import {Component, OnInit} from '@angular/core';
import {LearnWordsComponent} from '../learn-words/learn-words.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-repeat-words',
  templateUrl: './repeat-words.component.html',
  styleUrls: ['./repeat-words.component.sass']
})
export class RepeatWordsComponent extends LearnWordsComponent implements OnInit {
  public currentDate = new Date();

  ngOnInit() {
    this.wordService.getWords()
      .pipe(take(1))
      .subscribe((words) => {
        this.repeatFilter(words);
        this.makeRandomization(this.ProgressWordsList);
      });
  }

  public repeatFilter(words) {
    words.forEach((word) => {
      const dateDifference = (+this.currentDate - +new Date(word.date)) / 86400000;
      if (word.status === 'on-repeat') {
        if (dateDifference > 7 * (word.successes + 1)) {
          this.ProgressWordsList.push(word);
        } else {
          word.dateDifference = dateDifference;
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
      // if (currentWord.successes > 4) {
      //   currentWord.status = 'learned-new';
      //   currentWord.successes = 0;
      // }
    } else {
      this.mistake = true;
      this.mistakeAnswers++;
      currentWord.status = 'queue';
      currentWord.successes = 0;
    }
    currentWord.date = new Date();
    this.wordService.updateWord(currentWord);
  }

}
