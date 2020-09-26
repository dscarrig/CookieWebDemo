import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { CartService } from '../service/cart.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  itemsInCart: Object;

  constructor(
    public basicAuthenticationService: BasicAuthenticationService,
    private cartService: CartService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.itemsInCart = 0;
    this.refreshMenu();
  }

  getItemsInCart() {
    if (this.appComponent.getRefresh())
      this.refreshMenu();

    return this.itemsInCart;
  }

  refreshMenu() {
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (this.basicAuthenticationService.isUserLoggedIn()) {
      this.cartService.totalItemsInCart(username).subscribe(
        response => {
          this.itemsInCart = response;
          this.appComponent.finishedRefreshing();
        }
      )
    }
  }
    

}
