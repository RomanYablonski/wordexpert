import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  private userPassword = '123456789876543';
  constructor(private userService: UserService) {
  }

  checkPassword(password: string) {
    this.userService.isLoggedIn = password === this.userPassword
  }
}
