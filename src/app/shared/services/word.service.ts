import {Injectable} from '@angular/core';
import {BaseApi} from './base-api';
import { HttpClient } from '@angular/common/http';
import {Word} from '../models/word.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WordService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addWord(word: Word): Observable<Word> {
    return this.post('allwords', word);
  }

  getWords(): Observable<Word[]>  {
    return this.get('allwords');
  }

  updateWord(word): Observable<Word> {
    return this.put(`allwords/${word.id}`, word);
  }
}
