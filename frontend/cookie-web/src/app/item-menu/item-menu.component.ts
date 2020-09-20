import { Component, OnInit } from '@angular/core';
import { ShopItemService } from '../service/data/item-menu-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { CartService } from '../service/cart.service';

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

  shopItems: ShopItem[]
  username: string

  constructor(
    private itemMenuServie: ShopItemService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: BasicAuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser()
    this.refreshItems()
  }

  refreshItems() {
    this.itemMenuServie.retrieveAllItems().subscribe(
      response => {
        console.log(response);
        this.shopItems = response;
      }
    )
  }

  addItemToCart(item: ShopItem) {
    console.log(`Added ${item.itemName} to cart`)

    this.cartService.addToCart(this.username, item.id).subscribe(
      response => {
        
      }
    )
    
  }
}
