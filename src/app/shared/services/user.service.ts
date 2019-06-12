import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLoggedIn: boolean = false;
  private userPassword = '123456789876543';
  private localStorageKey: string = 'isLoggedIn';

  public checkPassword(password: string): boolean {
    this._isLoggedIn = password === this.userPassword;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this._isLoggedIn))
    return this._isLoggedIn
  }

  public checkIfLogged(): boolean {
    return this._isLoggedIn || JSON.parse(localStorage.getItem(this.localStorageKey));
  }
}
