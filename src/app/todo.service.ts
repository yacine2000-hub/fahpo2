import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Todo } from './todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = './assets/tasks.json';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  deleteTodoById(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  deleteTask(task: Todo): Observable<Todo> {
    return this.getTasks().pipe(
      map(tasks => {
        const index = tasks.findIndex(t => t.id === task.id);
        if (index > -1) {
          tasks.splice(index, 1);
          this.saveTasks(tasks);
          return task;
        }
        throw new Error('Task not found');
      })
    );
  }
  getTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
  private saveTasks(tasks: Todo[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
