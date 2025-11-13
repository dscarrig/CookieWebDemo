import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
import { EnterUserInfoComponent } from './enter-user-info/enter-user-info.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ModifyAddressComponent } from './modify-address/modify-address.component';
import { VerifyAddressComponent } from './verify-address/verify-address.component';
import { ConfirmCheckoutComponent } from './confirm-checkout/confirm-checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { ModifyCardNumComponent } from './modify-card-num/modify-card-num.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({ declarations: [
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
        UserCartComponent,
        EnterUserInfoComponent,
        CheckoutComponent,
        MyAccountComponent,
        ModifyAddressComponent,
        VerifyAddressComponent,
        ConfirmCheckoutComponent,
        OrderCompleteComponent,
        ModifyCardNumComponent,
        OrderHistoryComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
