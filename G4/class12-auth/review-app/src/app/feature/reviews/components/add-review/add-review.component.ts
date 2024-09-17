import { Component, inject } from '@angular/core';
import { MovieFormComponent } from '../review-form/review-form.component';
import { ReviewsService } from '../../../../core/services/reviews.service';
import { AddReviewReq } from '../../review.model';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss',
})
export class AddReviewComponent {
  private reviewsService = inject(ReviewsService);

  onReviewAdd(req: AddReviewReq) {
    this.reviewsService.addReview(req);
  }
}
