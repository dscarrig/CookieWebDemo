import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CreateUserService } from '../service/data/create-user.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private createUserService = inject(CreateUserService);


  username = '';
  password = '';
  fail = '';
  invalidLogin = false;
  userExists = false;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    if (this.route.snapshot.params.id === 'fail') {
      this.userExists = true;
    }
  }

  createUser(): void {
    console.log('Trying to create a user');

    this.createUserService.createUser(this.username, this.password);
  }

}
