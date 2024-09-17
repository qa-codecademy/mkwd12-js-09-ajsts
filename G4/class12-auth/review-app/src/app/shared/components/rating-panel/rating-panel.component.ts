import {
  Component,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-panel.component.html',
  styleUrl: './rating-panel.component.scss',
})
export class RatingPanelComponent {
  ratings = signal<[number, number][]>(this.generateRatings());

  startingValue = input<number>(0);

  currentValue = signal(this.startingValue());
  hoverValue = signal(this.startingValue());

  ratingOutput = output<number>();

  constructor() {
    effect(() => {
      const startingValue = this.startingValue();

      untracked(() => {
        this.currentValue.set(startingValue);
        this.hoverValue.set(startingValue);
      });
    });
  }

  ngOnInit() {
    if (this.startingValue()) this.currentValue.set(this.startingValue());

    console.log(this.currentValue());

    this.generateRatings();
  }

  generateRatings() {
    const result: [number, number][] = [];

    for (let i = 1; i <= 10; i++) {
      result.push([i - 0.5, i]);
    }

    return result;
  }

  onMouseEnter(rating: number) {
    this.hoverValue.set(rating);
  }

  onMouseLeave() {
    this.hoverValue.set(this.currentValue());
  }

  onClick(rating: number) {
    this.currentValue.set(rating);
    this.ratingOutput.emit(this.currentValue());
  }
}
