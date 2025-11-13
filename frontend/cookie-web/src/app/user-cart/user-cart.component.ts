import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { CartService } from '../service/cart.service';
import { AppComponent } from '../app.component';

export class ShopItem {
  constructor(
    public id: number,
    public itemName: string,
    public description: string,
    public price: number,
    public picture: string

  ) { }
}

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  authenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);


  shopItems: ShopItem[];
  username: string;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.shopItems = [new ShopItem(0, '0', '0', 0, '0')];
    this.refreshItems();
  }

  refreshItems() {
    this.cartService.retrieveAllFromCart(this.username).subscribe(
      response => {
        this.shopItems = response;
        this.appComponent.refreshMenu();
      }
    );
  }

  removeItemFromCart(item: ShopItem) {
    this.cartService.deleteFromCart(this.username, item.id).subscribe(
      () => {
        this.refreshItems();
      }
    );
  }

  getCartTotal() {
    let total = 0;
    let i;

    for (i = 0; i < this.shopItems.length; i++) {
      total = total + this.shopItems[i].price;
    }

    return total;
  }

  getCartItemsNum() {
    return this.shopItems.length;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  payNow() {
    this.router.navigate(['verify-address']);
  }

}
