import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TextStyleDirective } from '../../directives/text-style.directive';
import { RoleBasedDirective } from '../../directives/role-based.directive';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [CommonModule, TextStyleDirective, RoleBasedDirective],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.scss',
})
export class DirectivesComponent {
  isLoggedIn = input(false);
  fruits = input<string[]>(['Pineapple', 'Peach', 'Grape']);

  context = 'Some context';
}
