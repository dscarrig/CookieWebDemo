import { Component, OnInit } from '@angular/core';
import { ShopItemService } from '../service/data/item-menu-service.service';
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
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent implements OnInit {

  shopItems: ShopItem[] = [];
  username: string;

  constructor(
    private itemMenuService: ShopItemService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: BasicAuthenticationService,
    private cartService: CartService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.username = this.authenticationService.getAuthenticatedUser();
      this.refreshItems();
    }
    else {
      this.authenticationService.loginAsGuest().subscribe(
        (response: any) => {
          console.log(response);
          this.username = this.authenticationService.getAuthenticatedUser();
          this.refreshItems();
        }
      );
    }
  }

  refreshItems() {
    console.log('Fetching items from API...');
    this.itemMenuService.retrieveAllItems().subscribe(
      (response: ShopItem[]) => {
        console.log('Items received:', response);
        this.shopItems = response;
      },
      (error: any) => {
        console.error('Error fetching items:', error);
        this.shopItems = [];
      }
    );
  }

  addItemToCart(item: ShopItem) {
    console.log(`Added ${item.itemName} to cart`);

    this.cartService.addToCart(this.username, item.id).subscribe(
      (response: any) => {
        this.appComponent.refreshMenu();
      }
    );

  }
}
