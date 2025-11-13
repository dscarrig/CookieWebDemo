import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private cartService = inject(CartService);
  private appComponent = inject(AppComponent);


  username = '';
  password = '';
  errorMessage = 'Invalid Creds';
  invalidLogin = false;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
  }

  handleJWTAuthLogin() {
    console.log(this.username);

    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
      () => {
        console.log('logging in!');
        this.tranferTempCart();
        this.router.navigate(['welcome', this.username]);
        this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        }
      );
  }

  goToCreateAccount() {
    this.router.navigate(['createaccount']);
  }

  tranferTempCart() {
    this.cartService.copyTempCart(this.username).subscribe(
      () => {
        this.appComponent.refreshMenu();
        this.cartService.deleteAllFromCart('temp').subscribe();
      }
    );
  }


}
