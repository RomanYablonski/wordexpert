import { Component } from '@angular/core';
import { WordService } from './shared/services/word.service';
import { take } from 'rxjs/operators';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'WordsExpert';
  links = [
    { target: '/add-words', text: 'Add Words' },
    { target: '/check-words', text: 'Check Words' },
    { target: '/learn-words', text: 'Learn Words' },
    { target: '/repeat-words', text: 'Repeat Words' },
    { target: '/english', text: 'English' },
  ];
  constructor(private wordsService: WordService, public userService: UserService) {
    this.wordsService.getWords().pipe(take(1)).subscribe();
  }
}
