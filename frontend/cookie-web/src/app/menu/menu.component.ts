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
  userName: string;

  constructor(
    public basicAuthenticationService: BasicAuthenticationService,
    private cartService: CartService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.itemsInCart = 0;
    this.refreshMenu();
    this.userName = this.basicAuthenticationService.getAuthenticatedUser();
  }

  getItemsInCart() {
    if (this.appComponent.getRefresh())
      this.refreshMenu();

    return this.itemsInCart;
  }

  refreshMenu() {
    this.userName = this.basicAuthenticationService.getAuthenticatedUser();

    this.cartService.totalItemsInCart(this.userName).subscribe(
        response => {
          this.itemsInCart = response;
          this.appComponent.finishedRefreshing();
        }
    )

  }
    

}
