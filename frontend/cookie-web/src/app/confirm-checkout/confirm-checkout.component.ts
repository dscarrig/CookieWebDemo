import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDetailItem } from '../my-account/my-account.component';
import { ShopItem } from '../shop-item/shop-item.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.css']
})
export class ConfirmCheckoutComponent implements OnInit {

  username: string;
  accountDetailItem: AccountDetailItem;
  shopItems: ShopItem[];

  constructor(
    private userInfoService: UserInfoService,
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.shopItems = [new ShopItem(0, '0', '0', 0, '0')];
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '');
    this.refreshItems();

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      response => {
        this.accountDetailItem = response;
      }
    )
  }

  refreshItems() {
    this.cartService.retrieveAllFromCart(this.username).subscribe(
      response => {
        this.shopItems = response;
      }
    )
  }

  getCartTotal() {
    let total = 0;
    var i;

    for (i = 0; i < this.shopItems.length; i++) {
      total = total + this.shopItems[i].price;
    }

    return total;
  }

  orderComplete() {
    this.router.navigate(['order-complete']);
  }

  backToCart() {
    this.router.navigate(['cart']);
  }

}
