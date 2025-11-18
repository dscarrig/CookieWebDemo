import { Component, OnInit, inject } from '@angular/core';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';

export class AccountDetailItem {
  constructor(
    public id: number,
    public username: string,
    public fullName: string,
    public address: string,
    public addressTwo: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public cardNum: string,
    public isDefault: boolean

  ) { }
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);

  username: string;
  accountDetailItem: AccountDetailItem;
  defaultAccountDetailItem: AccountDetailItem;
  allAccountDetailItems: AccountDetailItem[];

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', false);
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {

    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
        this.defaultAccountDetailItem = this.accountDetailItem;
      }
    );

    this.userInfoService.getAllUsersAccountDetails(this.username).subscribe(
      response => {
        this.allAccountDetailItems = response;
        this.allAccountDetailItems.reverse();
      }
    );
  }

  modifyAddress() {
    this.router.navigate(['modify-address']);
  }

  modifyCardNum() {
    this.router.navigate(['modify-card-num']);
  }

  deleteAddress(toDelete) {

    this.userInfoService.deleteUserDetail(this.username, toDelete).subscribe(
      () => {
        this.ngOnInit();
      }
    );

  }

  deleteCardNum() {

    let combinedInfo;

    if (this.accountDetailItem.fullName === ' ' || this.accountDetailItem.fullName === '') {
      combinedInfo = ' _ _ _ _ _ _-1';
    }
    else {
      combinedInfo = this.accountDetailItem.fullName + '_' + this.accountDetailItem.address + '_' + this.accountDetailItem.addressTwo + '_' + this.accountDetailItem.city + '_' + this.accountDetailItem.state + '_' + this.accountDetailItem.zipCode + '_-1';
    }

    this.userInfoService.addUserInfo(this.username, combinedInfo).subscribe(
      () => {
        this.ngOnInit();
      }
    );

  }

  setAsDefault(newDefault: string) {
    this.userInfoService.setDefaultDetail(this.username, newDefault).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  hasSavedAddress() {
    return this.checkIfValid(this.accountDetailItem.address);
  }

  hasSavedCardNum() {
    return this.checkIfValid(this.accountDetailItem.cardNum);
  }

  hasAddressLineTwo() {
    return (this.accountDetailItem.addressTwo != '' && this.accountDetailItem.addressTwo != ' ');
  }

  checkIfValid(toCheck: string) {
    if (toCheck === ' ' || toCheck === '' || toCheck === '-1') {
      return 0;
    }
    else {
      return 1;
    }
  }

  isDefaultAccountDetailItem(compare) {
    return compare.isDefault ? 1 : 0;
  }
}
