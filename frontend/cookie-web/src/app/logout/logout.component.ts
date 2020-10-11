import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.basicAuthenticationService.logout();
  }

}
