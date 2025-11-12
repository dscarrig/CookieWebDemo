import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListtodoComponent } from './listtodo/listtodo.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { SuccessComponent } from './success/success.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { EnterUserInfoComponent } from './enter-user-info/enter-user-info.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ModifyAddressComponent } from './modify-address/modify-address.component';
import { VerifyAddressComponent } from './verify-address/verify-address.component';
import { ConfirmCheckoutComponent } from './confirm-checkout/confirm-checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { ModifyCardNumComponent } from './modify-card-num/modify-card-num.component';

// welcome route
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'createaccount', component: CreateaccountComponent },
  { path: 'createaccount/:id', component: CreateaccountComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'todos', component: ListtodoComponent, canActivate: [RouteGuardService] },
  { path: 'todos/:id', component: TodoComponent, canActivate: [RouteGuardService] },
  { path: 'menu', component: ItemMenuComponent },
  { path: 'cart', component: UserCartComponent },
  { path: 'enter-user-info', component: EnterUserInfoComponent, canActivate: [RouteGuardService] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [RouteGuardService] },
  { path: 'modify-address', component: ModifyAddressComponent, canActivate: [RouteGuardService] },
  { path: 'modify-card-num', component: ModifyCardNumComponent, canActivate: [RouteGuardService] },
  { path: 'verify-address', component: VerifyAddressComponent, canActivate: [RouteGuardService] },
  { path: 'confirm-checkout', component: ConfirmCheckoutComponent, canActivate: [RouteGuardService] },
  { path: 'order-complete', component: OrderCompleteComponent, canActivate: [RouteGuardService] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
