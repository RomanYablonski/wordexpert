import { CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private userService: UserService){}

  canActivateChild() {
    return this.userService.isLoggedIn;
  }
}
