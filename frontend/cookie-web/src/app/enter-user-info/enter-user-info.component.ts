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
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '');

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
        this.fullName = this.accountDetailItem.fullName;
        this.addressOne = this.accountDetailItem.address;
        this.addressTwo = this.accountDetailItem.addressTwo;
        this.city = this.accountDetailItem.city;
        this.state = this.accountDetailItem.state;
        this.zipCode = this.accountDetailItem.zipCode;

        if (this.accountDetailItem.cardNum != '-1')
          this.creditCardNumber = this.accountDetailItem.cardNum;
        else
          this.creditCardNumber = '';
      }
    )
  }

  proceedToCheckout() {
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    let combinedInfo = this.fullName + '_' + this.addressOne + '_' + this.addressTwo + '_' + this.city + '_' + this.state + '_' + this.zipCode + '_' + this.creditCardNumber;

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

  allCorrectFormat() {
    return this.zipCorrectFormat() && this.cardNumCorrectFormat() && this.stateCorrectFormat();
  }

  stateCorrectFormat() {
    let correct = true;

    if (this.state.length != 2)
      correct = false;

    if (this.state.match(/\d+/g) != null) {
      correct = false;
    }

    return correct;
  }

  zipCorrectFormat() {
    let correct = true;

    if (this.zipCode.length != 5)
      correct = false;

    if (this.zipCode.match(/^[0-9]+$/) == null)
      correct = false;

    return correct;
  }

  cardNumCorrectFormat() {
    let correct = true;

    if (this.creditCardNumber.length != 16)
      correct = false;

    if (this.creditCardNumber.match(/^[0-9]+$/) == null)
      correct = false;

    return correct;
  }

}
