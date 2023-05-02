import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  todos!: Todo[]; 
  newTodo: Todo = { id: null, title: '', description: '', completed: false };
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'fahpo2';
}
