import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(
    private authenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn())
      return true;
    else {
      console.log('Blocked by dat route guard!');
      this.router.navigate(['login']);
    }


    return false;
  }

  notLogged(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authenticationService.isUserLoggedIn())
      return true;
    else {
      console.log('Blocked by dat route guard!');
    }


    return false;
  }
}
