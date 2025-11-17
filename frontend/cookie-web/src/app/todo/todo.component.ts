import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../listtodo/listtodo.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private todoService = inject(TodoDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authenticationService = inject(BasicAuthenticationService);


  id!: number;
  username!: string | null;
  todo!: Todo;

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    this.todo = new Todo(this.id, '', false, new Date());

    if (this.id !== -1) {
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
        data => this.todo = data
        );
    }
  }

  saveTodo(): void {

    if (this.id === -1) {
      this.todoService.createTodo(this.username, this.todo)
        .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        }

        );
    }
    else {
      this.todoService.updateTodo(this.username, this.id, this.todo)
        .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        }
        );
    }

  }


}
