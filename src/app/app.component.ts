import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  todos!: Todo[];
  newTodo: Todo = { id: 0, title: '', description: '', completed: false };
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos: Todo[]) => this.todos = todos);
  }
  title = 'fahpo2';
  add() {
    this.todoService.addTodo(this.newTodo).subscribe(todo => {
      this.todos.push(todo);
      this.newTodo = { id: 0, title: '', description: '', completed: false };
    });
  }


  delete(todo: Todo) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTask(todo).subscribe(() => {
        this.todos = this.todos.filter(t => t !== todo);
      });
    }
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(updatedTodo => {
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      this.todos[index] = updatedTodo;
    });
  }

}
