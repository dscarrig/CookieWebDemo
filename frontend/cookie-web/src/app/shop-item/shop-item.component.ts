import { Component, OnInit, inject } from '@angular/core';
import { ShopItemService } from '../service/data/item-menu-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

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
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  private itemMenuServie = inject(ShopItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authenticationService = inject(BasicAuthenticationService);


  shopItems!: ShopItem[];

  id!: number;
  itemName!: string;
  description!: string;
  price!: number;
  picture!: string;
  shopItem!: ShopItem;

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    this.shopItem = new ShopItem(this.id, this.itemName, this.description, this.price, this.picture);

    if (this.id !== -1) {
      this.itemMenuServie.retrieveItem(this.id).subscribe(
        (data: ShopItem) => this.shopItem = data
      );
    }
  }

}
