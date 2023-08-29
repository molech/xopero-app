import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../types/todo-models";

@Injectable({
  providedIn: "root",
})
export class TodoApiService {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) {}

  fetchTodos(userId: number): Observable<Todo[]> {
    const url = `${this.baseUrl}/todos?userId=${userId}`;
    return this.http.get<Todo[]>(url);
  }

  addTodo(userData: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/todos`;
    return this.http.post<Todo>(url, userData);
  }

  updateTodo(todoId: number, todoData: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/todos/${todoId}`;
    return this.http.patch<Todo>(url, todoData);
  }
}
