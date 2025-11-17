import { Component, OnInit, inject } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { CartService } from '../service/cart.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  basicAuthenticationService = inject(BasicAuthenticationService);
  private cartService = inject(CartService);
  private appComponent = inject(AppComponent);

  itemsInCart = 0;
  userName!: string;

  ngOnInit(): void {
    this.itemsInCart = 0;
    this.refreshMenu();
    this.userName = this.basicAuthenticationService.getAuthenticatedUser() || '';
  }

  getItemsInCart(): number {
    if (this.appComponent.getRefresh()) {
      this.refreshMenu();
    }

    return this.itemsInCart;
  }

  refreshMenu(): void {
    this.userName = this.basicAuthenticationService.getAuthenticatedUser() || '';

    this.cartService.totalItemsInCart(this.userName).subscribe(
      (response: number) => {
          this.itemsInCart = response;
          this.appComponent.finishedRefreshing();
        }
    );
  }


}
