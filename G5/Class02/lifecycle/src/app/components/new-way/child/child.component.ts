import { Component, input, effect, output } from '@angular/core';
import { Todo } from '../../../types/todo.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  counter = input(0); // optional input signal
  name = input.required(); // input.required => is not option (it is mendatory)
  todoOutput = output<Todo>();

  todoName = '';

  createTodo() {
    const createdTodo: Todo = {
      id: Date.now(),
      title: this.todoName,
      isDone: false,
    };

    console.log(createdTodo);

    this.todoOutput.emit(createdTodo);
    this.todoName = '';
  }

  constructor() {
    effect(() => {
      console.log('Child component effect');
    });

    effect(() => {
      console.log('Child component counter effect', this.counter());
    });

    effect(() => {
      console.log('Child component name effect', this.name());
    });
  }
}
