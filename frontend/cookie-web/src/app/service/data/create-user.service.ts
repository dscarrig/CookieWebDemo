import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(
    private http: HttpClient,
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  createUser(username, password) {
    this.basicAuthenticationService.executeJWTAuthenticationService("temp", "temp")
      .subscribe(
      data => {
          console.log(data);
        this.http.post(`${API_URL}/users/new/${username}`, password).subscribe(
          data => {
            console.log(data)
            this.basicAuthenticationService.logout()
            this.router.navigate(['success'])
          },
          error => {
            console.log(error)
          }
        )
        },
        error => {
          console.log(error)
        }
      )
  }

  receiveUser(user) {

    user.subscribe(
      data => {
        this.basicAuthenticationService.logout()
        this.router.navigate(['success'])
      },
      error => {
        console.log(error)
      })
  }
}
