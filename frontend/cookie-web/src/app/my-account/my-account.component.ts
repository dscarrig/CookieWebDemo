import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

export class AccountDetailItem {
  constructor(
    public id: number,
    public username: string,
    public fullName: string,
    public address: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public cardNum: string

  ) { }
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  username: string;
  accountDetailItem: AccountDetailItem;

  constructor(
    private userInfoService: UserInfoService,
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '');
    this.refreshAccountInfo();
  }

  refreshAccountInfo() {

    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
      }
    )
  }

  modifyAddress() {
    this.router.navigate(['modify-address']);
  }

  modifyCardNum() {
    this.router.navigate(['modify-card-num']);
  }

  hasSavedAddress() {
    if (this.accountDetailItem.address === ' ' || this.accountDetailItem.address === '') {
      return 0;
    }
    else {
      return 1;
    }
      
  }

  hasSavedCardNum() {
    if (this.accountDetailItem.cardNum === ' ' || this.accountDetailItem.address === '')
      return 0;
    else
      return 1;
  }

}
