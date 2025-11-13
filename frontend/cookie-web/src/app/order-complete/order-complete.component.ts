import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../service/cart.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  private cartService = inject(CartService);
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.cartService.deleteAllFromCart(this.basicAuthenticationService.getAuthenticatedUser()).subscribe(
      () => {
        this.appComponent.refreshMenu();
      }
    );
  }

}
