import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [],
  // templateUrl: './templates.component.html',
  template: `
    <div>
      <h1>Hi from {{ name }} component!</h1>
    </div>
  `,
  styleUrl: './templates.component.css'
})
export class TemplatesComponent {
  name = 'Templates'
}
