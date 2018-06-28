import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  username: string = "";

  constructor() {

  }

  userIsLoggedIn(): boolean {
    if (window.sessionStorage['lydsa-username']) {
      this.username = window.sessionStorage['lydsa-username'];
      return true;
    }
    return false;
  }

  logoutUser(): void {
    delete window.sessionStorage['lydsa-username'];
  }
}
