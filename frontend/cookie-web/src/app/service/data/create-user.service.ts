import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  userExists: Boolean = false

  constructor(
    private http: HttpClient,
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  createUser(username, password) {

    this.basicAuthenticationService.executeJWTAuthenticationService("temp", "temp")
      .subscribe(
      data => {

        this.http.get < Boolean >(`${API_URL}/users/exists/${username}`).subscribe(
          data => {
            this.userExists = data
          }
        )

        this.http.post(`${API_URL}/users/new/${username}`, password).subscribe(
          data => {
            console.log(data)
            this.basicAuthenticationService.logout()

            if (!this.userExists)
              this.router.navigate(['success'])
            else
              this.router.navigate(['createaccount', 'fail'])
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

}
