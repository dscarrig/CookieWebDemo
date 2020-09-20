import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NumbersComponent } from './numbers/numbers.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListtodoComponent } from './listtodo/listtodo.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { SuccessComponent } from './success/success.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { UserCartComponent } from './user-cart/user-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NumbersComponent,
    LoginComponent,
    ErrorComponent,
    ListtodoComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    CreateaccountComponent,
    SuccessComponent,
    ItemMenuComponent,
    ShopItemComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
