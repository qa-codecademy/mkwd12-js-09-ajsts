import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-conditional',
  standalone: true,
  imports: [NgIf],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.css'
})
export class ConditionalComponent {
  age: number = Math.floor(Math.random() * 100) // 0 - 99
}
