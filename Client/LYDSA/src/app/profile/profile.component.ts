import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  numberOfPoints: number = 0;
  email: string = "";
  gender: string = "";
  bio: string = "";

  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['user'];
    });

    this.getProfileData();
  }

  saveProfile(): void {
    this.http.post(`http://127.0.0.1:3005/profile/${this.username}`, {
      bio: this.bio,
      email: this.email,
      gender: this.gender
    }, httpOptions)
      .toPromise()
      .catch(err => console.log(err));
  }

  changePassword(): void {

  }

  getProfileData(): void {
    this.http.get(`http://127.0.0.1:3005/profile/${this.username}`, httpOptions)
      .toPromise()
      .then((res: any) => {
        this.bio = res.bio;
        this.email = res.email;
        this.gender = this.capitalizeFirstLetter(res.gender);
      });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}