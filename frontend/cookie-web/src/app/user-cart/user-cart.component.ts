import { Component, OnInit } from '@angular/core';
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

  shopItems: ShopItem[]
  username: string

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: BasicAuthenticationService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser()
    this.shopItems = [new ShopItem(0,'0','0',0,'0')];
    this.refreshItems();
  }

  refreshItems() {
    this.cartService.retrieveAllFromCart(this.username).subscribe(
      response => {
        this.shopItems = response;
        this.appComponent.refreshMenu();
      }
    )
  }

  removeItemFromCart(item: ShopItem) {
    this.cartService.deleteFromCart(this.username, item.id).subscribe(
      response => {
        this.refreshItems();
      }
    )
  }

  getCartTotal() {
    var total = 0
    var i

    for (i = 0; i < this.shopItems.length; i++) {
      total = total + this.shopItems[i].price
    }

    return total
  }

  getCartItemsNum() {
    return this.shopItems.length
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  payNow() {
    this.router.navigate(['enter-user-info']);
  }

}
