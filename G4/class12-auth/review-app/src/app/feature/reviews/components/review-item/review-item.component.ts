import { Component, input } from '@angular/core';
import { Review } from '../../review.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.scss',
})
export class ReviewItemComponent {
  review = input.required<Review>();
}
