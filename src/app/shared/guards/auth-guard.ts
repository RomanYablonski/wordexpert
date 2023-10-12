
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard  {

  constructor(private userService: UserService){}

  canActivateChild() {
    return this.userService.checkIfLogged();
  }
}
