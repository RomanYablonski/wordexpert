import {Injectable} from '@angular/core';
import {BaseApi} from './base-api';
import { HttpClient } from '@angular/common/http';
import {Word} from '../models/word.model';
import {Observable} from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class WordService extends BaseApi {
  public lastWords: Word[] = [];
  constructor(public http: HttpClient, private firebaseHelper: FirebaseHelperService) {
    super(http);
  }

  addWord(word: Word): void {
    this.firebaseHelper.post('allwords', word);
  }

  getWords(): Observable<Word[]>  {
    return this.firebaseHelper.get('allwords').pipe(tap(res => this.lastWords = res ));
  }

  updateWord(word): void {
    this.put(`allwords/${word.id}`, word).subscribe(() => null);
  }
}
