import { Component, OnInit, inject } from '@angular/core';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';
import { AccountDetailItem } from '../my-account/my-account.component';

@Component({
  selector: 'app-verify-address',
  templateUrl: './verify-address.component.html',
  styleUrls: ['./verify-address.component.css']
})
export class VerifyAddressComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);

  username: string;
  accountDetailItem: AccountDetailItem;

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '', false);

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
        this.checkIfAddressSaved();
      }
    );
  }

  checkIfAddressSaved() {
    if (this.accountDetailItem.fullName === ' ' || this.accountDetailItem.fullName === ''
      || this.accountDetailItem.address === ' ' || this.accountDetailItem.address === ''
      || this.accountDetailItem.city === ' ' || this.accountDetailItem.city === ''
      || this.accountDetailItem.state === ' ' || this.accountDetailItem.state === ''
      || this.accountDetailItem.zipCode === ' ' || this.accountDetailItem.zipCode === ''
      || this.accountDetailItem.cardNum === ' ' || this.accountDetailItem.cardNum === '' || this.accountDetailItem.cardNum === '-1') {
      this.navigateToEnterUserInfo();
    }
  }

  navigateToEnterUserInfo() {
    this.router.navigate(['enter-user-info']);
  }

  navigateToConfirmCheckout() {
    this.router.navigate(['confirm-checkout']);
  }



}
