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
  defaultAccountDetailItem: AccountDetailItem;
  allAccountDetailItems: AccountDetailItem[];

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
        this.defaultAccountDetailItem = this.accountDetailItem;
      }
    )

    this.userInfoService.getAllUsersAccountDetails(this.username).subscribe(
      response => {
        this.allAccountDetailItems = response;
        this.allAccountDetailItems.reverse();
      }
    )
  }

  modifyAddress() {
    this.router.navigate(['modify-address']);
  }

  modifyCardNum() {
    this.router.navigate(['modify-card-num']);
  }

  deleteAddress(toDelete) {
   
    this.userInfoService.deleteUserDetail(this.username, toDelete).subscribe(
      response => {
        this.ngOnInit();

      }
    )
  }

  setAsDefault(newDefault) {
    this.userInfoService.setDefaultDetail(this.username, newDefault).subscribe(
      response => {
        this.ngOnInit();
      }
    )
  }

  hasSavedAddress() {
    return this.checkIfValid(this.accountDetailItem.address);
  }

  hasSavedCardNum() {
    return this.checkIfValid(this.accountDetailItem.cardNum);
  }


  checkIfValid(toCheck: string) {
    if (toCheck === ' ' || toCheck === '' || toCheck === '-1')
      return 0;
    else
      return 1;
  }

  isDefaultAccountDetailItem(compare) {
    console.log(`Default address is ${this.defaultAccountDetailItem.address}`);
    console.log(`Compare address is ${compare.address}`);
    if (compare.address === this.defaultAccountDetailItem.address)
      return 1;
    else
      return 0;
  }
}
