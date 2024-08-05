import { Component } from '@angular/core';
import { OtherComponent } from "./other.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-styles',
  standalone: true,
  imports: [OtherComponent, NgClass],
  templateUrl: './styles.component.html',
  // styleUrl: './styles.component.css'
  styleUrls: ['./styles.component.css']
})
export class StylesComponent {
  random: number = Math.random() * 10 // 0-9
}
