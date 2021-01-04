import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseHelperService {

  constructor(private db: AngularFireDatabase) {
  }

  public get(url: string = 'allwords'): Observable<any> {
    return this.db.list(url).snapshotChanges().pipe(map(words =>
      words.map(word => ({ ...word.payload.val() as object, key: word.payload.key }))
    ));
  }

  public post(url: string = 'allwords', data: any = {}): void {
    this.db.list(url).push(data);
  }

  public put(word, url: string = 'allwords'): Promise<void> {
    return this.db.list(url).update(word.key, word);
  }
}
