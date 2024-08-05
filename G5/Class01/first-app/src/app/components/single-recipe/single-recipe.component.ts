import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [CommonModule], // Needed only for DIRECTIVE => *ngIf
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent {
  // @Input => means that will component will accept prop named title from it's parent
  // by default it is not required
  @Input() title: string = '';

  @Input({ required: true }) description: string = '';

  @Input({ required: true }) foodHasAlergens: boolean = false;
}
