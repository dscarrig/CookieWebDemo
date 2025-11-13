import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../listtodo/listtodo.component';
import { TODO_JPA_API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  private http = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  retrieveTodo(username, id) {
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`);
  }

  deleteTodo(username, id) {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    return this.http.put(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo) {
    return this.http.post(`${TODO_JPA_API_URL}/users/${username}/todos/`, todo);

  }
}
