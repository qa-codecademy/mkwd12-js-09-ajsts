import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';

@NgModule({
  declarations: [TodosComponent, SingleTodoComponent],
  imports: [CommonModule],
  exports: [TodosComponent],
})
export class TodosModule {}
