import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'Cookie Land'
  message = 'Heya doo-doo head. '
  name = ''
  welcomeMessageFromService: string

  //ActivatedRoute
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService,
    public basicAuthenticationService: BasicAuthenticationService
  ) {

  }

  ngOnInit(): void {
    console.log(this.message);
    this.name = this.basicAuthenticationService.getAuthenticatedUser();
  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

  }

  getWelcomeMessageWithParameter() {

    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

  }

  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error) {
    this.welcomeMessageFromService = error.error.message;
  }

}
