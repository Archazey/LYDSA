import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: string;
  accountRole: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  registerAccount(): void {
    if (this.password != this.confirmPassword) {
      console.log('passwords do not match');
      return;
    }
    
    this.http.post("http://127.0.0.1:3005/register", {
      username: this.username,
      password: this.password,
      email: this.email,
      gender: this.gender,
      role: this.accountRole
    }, httpOptions)
      .toPromise()
      .then(res => {
        this.router.navigate([`/login`]);
      })
      .catch(err => console.log(err));
  }

}
