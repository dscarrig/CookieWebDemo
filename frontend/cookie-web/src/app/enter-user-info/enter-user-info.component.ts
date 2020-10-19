import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AccountDetailItem } from '../my-account/my-account.component';

@Component({
  selector: 'app-enter-user-info',
  templateUrl: './enter-user-info.component.html',
  styleUrls: ['./enter-user-info.component.css']
})
export class EnterUserInfoComponent implements OnInit {

  accountDetailItem: AccountDetailItem;
  username: string;

  fullName = '';
  addressOne = '';
  addressTwo = '';
  city = '';
  state = '';
  zipCode = '';
  creditCardNumber = '';

  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '');

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
      }
    )
  }

  proceedToCheckout() {
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    let combinedInfo = this.fullName + '_' + this.addressOne + ' ' + this.addressTwo + '_' + this.city + '_' + this.state + '_' + this.zipCode + '_' + this.creditCardNumber;

    this.userInfoService.addUserInfo(username, combinedInfo).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['confirm-checkout']);
      }
    )
  }

  backToCart() {
    this.router.navigate(['cart']);
  }

  allInputEntered() {
    if (this.fullName === '' || this.addressOne === '' || this.city === ''
      || this.state === '' || this.zipCode === '' || this.creditCardNumber === '')
      return false;
    else
      return true;
  }

}
