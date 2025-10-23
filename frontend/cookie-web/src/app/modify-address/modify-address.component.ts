import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { UserInfoService } from '../service/user-info.service';
import { AccountDetailItem } from '../my-account/my-account.component';

@Component({
  selector: 'app-modify-address',
  templateUrl: './modify-address.component.html',
  styleUrls: ['./modify-address.component.css']
})
export class ModifyAddressComponent implements OnInit {
  accountDetailItem!: AccountDetailItem;
  username = '';
  fullName = '';
  addressOne = '';
  addressTwo = '';
  city = '';
  state = '';
  zipCode = '';

  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '');

    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
      }
    );
  }

  saveNewAddress(): void {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    let combinedInfo;

    if (this.accountDetailItem.cardNum === '' || this.accountDetailItem.cardNum === '-1') {
      combinedInfo = this.fullName + '_' + this.addressOne + '_' + this.addressTwo + '_' +
                    this.city + '_' + this.state + '_' + this.zipCode + '_-1';
    } else {
      combinedInfo = this.fullName + '_' + this.addressOne + '_' + this.addressTwo + '_' +
                    this.city + '_' + this.state + '_' + this.zipCode + '_' + this.accountDetailItem.cardNum;
    }

    this.userInfoService.addUserInfo(username, combinedInfo).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['my-account']);
      }
    );
  }

  allInputEntered(): boolean {
    if (this.fullName === '' || this.addressOne === '' || this.city === ''
      || this.state === '' || this.zipCode === '') {
      return false;
    } else {
      return true;
    }
  }

  allCorrectFormat(): boolean {
    return this.zipCorrectFormat() && this.stateCorrectFormat();
  }

  stateCorrectFormat(): boolean {
    let correct = true;

    if (this.state.length !== 2) {
      correct = false;
    }

    if (this.state.match(/\d+/g) !== null) {
      correct = false;
    }

    return correct;
  }

  zipCorrectFormat(): boolean {
    let correct = true;

    if (this.zipCode.length !== 5) {
      correct = false;
    }

    if (this.zipCode.match(/^[0-9]+$/) === null) {
      correct = false;
    }

    return correct;
  }

  backToUserInfo(): void {
    this.router.navigate(['my-account']);
  }

}
