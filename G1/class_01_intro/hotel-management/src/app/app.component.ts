import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
import { StylesComponent } from "./styles/styles.component";
import { OtherComponent } from './styles/other.component';
import { ConditionalComponent } from "./conditional/conditional.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplatesComponent, StylesComponent, OtherComponent, ConditionalComponent],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-management 1';

  
}
