import { Component } from '@angular/core';
import { PersonalDetails } from './components/personal-details/personal-details.component';
import { RecipesComponent } from './components/recipes/recipes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonalDetails, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'first-app';
}
