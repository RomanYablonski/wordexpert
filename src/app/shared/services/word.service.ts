import {Injectable} from '@angular/core';
import { BaseApi } from './base-api';
import { Word } from '../models/word.model';
import { Observable } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WordService extends BaseApi {
  public lastWords: Word[] = [];
  constructor(public http: HttpClient, private firebaseHelper: FirebaseHelperService) {
    super(http);
  }

  addWord(key: string, word: Word) {
    return this.firebaseHelper.post('allwords', key, word);
  }

  getWords(): Observable<Word[]>  {
    return this.firebaseHelper.get('allwords').pipe(tap(res => this.lastWords = res));
  }

  updateWord(word): Promise<void> {
    return this.firebaseHelper.put(word);
  }
}
