import { Component, OnInit, inject } from '@angular/core';
import { UserInfoService } from '../service/user-info.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';
import { AccountDetailItem } from '../my-account/my-account.component';
import { ShopItem } from '../shop-item/shop-item.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.css']
})
export class ConfirmCheckoutComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);
  private cartService = inject(CartService);


  username!: string;
  accountDetailItem!: AccountDetailItem;
  shopItems!: ShopItem[];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser() || '';
    this.shopItems = [new ShopItem(0, '0', '0', 0, '0')];
    this.accountDetailItem = new AccountDetailItem(0, '', '', '', '', '', '', '', '');
    this.refreshItems();

    this.userInfoService.getUserAccountDetails(this.username).subscribe(
      (response: AccountDetailItem) => {
        console.log('Account details loaded:', response);
        this.accountDetailItem = response;
      },
      (error: any) => {
        console.error('Error loading account details:', error);
      }
    );
  }

  refreshItems(): void {
    this.cartService.retrieveAllFromCart(this.username).subscribe(
      (response: ShopItem[]) => {
        console.log('Cart items loaded:', response);
        this.shopItems = response;
      },
      (error: any) => {
        console.error('Error loading cart items:', error);
        this.shopItems = [];
      }
    );
  }

  getCartTotal(): number {
    if (!this.shopItems || this.shopItems.length === 0) {
      return 0;
    }
    
    let total = 0;
    let i;

    for (i = 0; i < this.shopItems.length; i++) {
      total = total + this.shopItems[i].price;
    }

    return total;
  }

  orderComplete(): void {
    this.router.navigate(['order-complete']);
  }

  backToCart(): void {
    this.router.navigate(['cart']);
  }

}
