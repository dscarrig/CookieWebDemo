import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { UserInfoService } from '../service/user-info.service';
import { AccountDetailItem } from '../my-account/my-account.component';

@Component({
  selector: 'app-modify-card-num',
  templateUrl: './modify-card-num.component.html',
  styleUrls: ['./modify-card-num.component.css']
})
export class ModifyCardNumComponent implements OnInit {
  private router = inject(Router);
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);


  accountDetailItem: AccountDetailItem;
  username = '';
  cardNum = '';

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '');

    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
      }
    );
  }

  saveNewCardNum() {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    let combinedInfo;

    if (this.accountDetailItem.fullName === ' ' || this.accountDetailItem.fullName === '') {
      combinedInfo = ' _ _ _ _ _ _' + this.cardNum;
    }
    else {
      combinedInfo = this.accountDetailItem.fullName + '_' + this.accountDetailItem.address + '_' + this.accountDetailItem.addressTwo + '_' + this.accountDetailItem.city + '_' + this.accountDetailItem.state + '_' + this.accountDetailItem.zipCode + '_' + this.cardNum;
    }

    this.userInfoService.addUserInfo(username, combinedInfo).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['my-account']);
      }
    );
  }

  allInputEntered() {
    if (this.cardNum === '') {
      return false;
    }
    else {
      return true;
    }
  }

  cardNumCorrectFormat() {
    let correct = true;

    if (this.cardNum.length != 16) {
      correct = false;
    }

    if (this.cardNum.match(/^[0-9]+$/) == null) {
      correct = false;
    }

    return correct;
  }

  backToUserInfo() {
    this.router.navigate(['my-account']);
  }

}
