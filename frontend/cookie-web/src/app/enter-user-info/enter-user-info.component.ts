import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enter-user-info',
  templateUrl: './enter-user-info.component.html',
  styleUrls: ['./enter-user-info.component.css']
})
export class EnterUserInfoComponent implements OnInit {

  addressOne = '';
  addressTwo = '';
  city = '';
  state = '';
  creditCardNumber = '';

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  proceedToCheckout() {

  }

  backToCart() {
    this.router.navigate(['cart']);
  }

}
