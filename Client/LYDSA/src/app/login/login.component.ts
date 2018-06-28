import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.http.post("http://127.0.0.1:3005/login", {
      username: this.username,
      password: this.password
    }, httpOptions)
      .toPromise()
      .then(res => {
        window.sessionStorage['lydsa-username'] = this.username;
        this.router.navigate([`/profile/${this.username}`])
      })
      .catch(err => console.log(err));
  }

}
