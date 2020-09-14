import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-listtodo',
  templateUrl: './listtodo.component.html',
  styleUrls: ['./listtodo.component.css']
})
export class ListtodoComponent implements OnInit {

  todos: Todo[]

  message: string
  username: string

  constructor(
    private todoService: TodoDataService,
    private authenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  
  ngOnInit(): void {

    this.username = this.authenticationService.getAuthenticatedUser();
    this.refreshTodos();
    
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  updateTodo(id) {
    console.log(`update todo ${id}`);
    this.router.navigate(['todos', id]);
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        console.log(response)
        this.message = `Delete of Todo ${id} Successful!!`;
        this.refreshTodos();
      }
    )
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
  

}
