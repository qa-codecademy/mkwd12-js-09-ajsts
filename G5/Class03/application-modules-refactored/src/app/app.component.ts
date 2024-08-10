import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [HeaderComponent, TodosComponent],
})
export class AppComponent {
  title = 'application-modules';
}
