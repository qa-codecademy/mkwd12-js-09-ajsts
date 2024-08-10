import { Component } from '@angular/core';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  standalone: true,
  imports: [SingleTodoComponent],
})
export class TodosComponent {
  todos = [
    { id: 1, title: 'Title 1', isDone: false },
    { id: 2, title: 'Title 2', isDone: true },
  ];

  checkIfComplete(todoDone: boolean) {
    if (todoDone) {
      return 'Todo is finished';
    }

    return 'Todo is not finished';
  }
}
