import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'Invalid Creds';
  invalidLogin = false;

  constructor(
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  handleJWTAuthLogin() {
    console.log(this.username);
  
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
      data => {
        console.log('logging in!');
        this.tranferTempCart();
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      )
  }

  goToCreateAccount() {
    this.router.navigate(['createaccount']);
  }

  tranferTempCart() {
    this.cartService.copyTempCart(this.username).subscribe(
      data => { }
    )

    this.cartService.deleteAllFromCart("temp").subscribe(
      data => { }
    )
  }

}
