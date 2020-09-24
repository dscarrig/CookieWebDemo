import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  errorMessage = 'Invalid Creds'
  invalidLogin = false

  constructor(
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
  }

  handleJWTAuthLogin() {
    console.log(this.username);
  
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
      data => {
          console.log('logging in!')
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false
        },
        error => {
          console.log(error)
          this.invalidLogin = true
        }
      )
  }

}
