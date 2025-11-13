import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  private authenticationService = inject(BasicAuthenticationService);
  private router = inject(Router);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    else {
      console.log('Blocked by dat route guard!');
      this.router.navigate(['login']);
    }


    return false;
  }

  notLogged(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (!this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    else {
      console.log('Blocked by dat route guard!');
    }


    return false;
  }
}
