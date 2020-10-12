import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  username: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNum: string;

  constructor(
    private userInfoService: UserInfoService,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    this.userInfoService.getUserAddress(this.username).subscribe(
      response => {
        this.address = response;
      }
    )
  }

}
