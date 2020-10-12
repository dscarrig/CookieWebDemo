import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private basicAuthenticationService: BasicAuthenticationService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.cartService.deleteAllFromCart(this.basicAuthenticationService.getAuthenticatedUser()).subscribe(
      data => {
        this.appComponent.refreshMenu();
      }
    )
  }

}
