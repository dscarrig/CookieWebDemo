import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { UserInfoService } from '../service/user-info.service';
import { AccountDetailItem } from '../my-account/my-account.component';

@Component({
  selector: 'app-modify-card-num',
  templateUrl: './modify-card-num.component.html',
  styleUrls: ['./modify-card-num.component.css']
})
export class ModifyCardNumComponent implements OnInit {

  accountDetailItem: AccountDetailItem;
  username = '';
  cardNum = '';

  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '');

    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
      }
    )
  }

  saveNewCardNum() {
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    var combinedInfo

    if (this.accountDetailItem.fullName === ' ' || this.accountDetailItem.fullName === '')
      combinedInfo = ' _ _ _ _ _' + this.cardNum;
    else
      combinedInfo = this.accountDetailItem.fullName + '_' + this.accountDetailItem.address + '_' + this.accountDetailItem.city + '_' + this.accountDetailItem.state + '_' + this.accountDetailItem.zipCode + '_' + this.cardNum;

    this.userInfoService.addUserInfo(username, combinedInfo).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['my-account']);
      }
    )
  }

  allInputEntered() {
    if (this.cardNum === '')
      return false;
    else
      return true;
  }

  backToUserInfo() {
    this.router.navigate(['my-account']);
  }

}
