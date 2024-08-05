import { NgFor, NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-iteration',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './iteration.component.html',
  styleUrl: './iteration.component.css'
})
export class IterationComponent {
  cars: string[] = ['BMW', 'Mercedes', 'Opel', 'Kia']
}
