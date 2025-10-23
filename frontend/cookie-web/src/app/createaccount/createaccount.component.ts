import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CreateUserService } from '../service/data/create-user.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  username = '';
  password = '';
  fail = '';
  invalidLogin = false;
  userExists = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private createUserService: CreateUserService
  ) { }

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
