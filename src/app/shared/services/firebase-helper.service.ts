import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class FirebaseHelperService {

  constructor(private db: AngularFireDatabase) {
  }

  public get(url: string = ''): Observable<any> {
    return this.db.list(url).valueChanges();
  }

  public post(url: string = '', data: any = {}): void {
    this.db.list(url).push(data);
  }

  // https://github.com/angular/angularfire2/blob/HEAD/docs/rtdb/lists.md

  // public put(url: string = '', data: any = {}): Observable<any> {
  //   return this.http.put(this.getUrl(url), data);
  // }
}
