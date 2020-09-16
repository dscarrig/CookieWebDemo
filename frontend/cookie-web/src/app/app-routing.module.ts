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
  { path: 'menu', component: ItemMenuComponent, canActivate: [RouteGuardService] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
