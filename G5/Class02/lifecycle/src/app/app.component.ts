import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { ParentComponent } from './components/traditional-way/parent/parent.component'; // This is the old way example, uncomment to see it

import { ParentComponent } from './components/new-way/parent/parent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lifecycle';
}
