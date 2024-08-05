import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
import { StylesComponent } from "./styles/styles.component";
import { OtherComponent } from './styles/other.component';
import { ConditionalComponent } from "./conditional/conditional.component";
import { IterationComponent } from './iteration/iteration.component';
import { BindingComponent } from "./binding/binding.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplatesComponent, StylesComponent, OtherComponent, ConditionalComponent, IterationComponent, BindingComponent],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-management 1';

  
}
