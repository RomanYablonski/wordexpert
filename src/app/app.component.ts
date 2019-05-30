import { Component } from '@angular/core';
import { WordService } from './shared/services/word.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private wordsService: WordService) {
    this.wordsService.getWords().pipe(take(1)).subscribe();
  }

  title = 'WordsExpert';
}
