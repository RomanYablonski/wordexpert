import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  @Output() onLogin = new EventEmitter();
  constructor(private userService: UserService) {
  }

  checkPassword(password: string) {
    this.userService.checkPassword(password);
    this.onLogin.emit(this.userService.checkIfLogged());
  }
}
