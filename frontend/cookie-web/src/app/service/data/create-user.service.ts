import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  userExists = false;

  constructor(
    private http: HttpClient,
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  createUser(username: string, password: string): void {

    this.basicAuthenticationService.executeJWTAuthenticationService('temp', 'temp')
      .subscribe(
        (_response: any) => {

        this.http.get<boolean>(`${API_URL}/users/exists/${username}`).subscribe(
          userExistsData => {
            this.userExists = userExistsData;
          }
        );

        this.http.post(`${API_URL}/users/new/${username}`, password).subscribe(
          result => {
            console.log(result);
            this.basicAuthenticationService.logout();

            if (!this.userExists) {
              this.router.navigate(['success']);
            } else {
              this.router.navigate(['createaccount', 'fail']);
            }
          },
          error => {
            console.log(error);
          }
        );
        },
        (error: any) => {
          console.log(error);
        }
    );
  }

}
