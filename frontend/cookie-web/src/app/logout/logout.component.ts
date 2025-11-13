import { Component, OnInit, inject } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private basicAuthenticationService = inject(BasicAuthenticationService);
  private appComponent = inject(AppComponent);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.basicAuthenticationService.logout();
  }

}
