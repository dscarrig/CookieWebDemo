import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CreateUserService } from '../service/data/create-user.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(
    private router: Router,
    private createUserService: CreateUserService
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    console.log('Trying to create a user')

    this.createUserService.createUser(this.username, this.password)
  }

}
