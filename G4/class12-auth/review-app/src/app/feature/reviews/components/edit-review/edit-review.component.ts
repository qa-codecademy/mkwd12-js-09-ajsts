import { Component, effect, inject } from '@angular/core';
import { MovieFormComponent } from '../review-form/review-form.component';
import { ReviewsService } from '../../../../core/services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AddReviewReq } from '../../review.model';

@Component({
  selector: 'app-edit-review',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.scss',
})
export class EditReviewComponent {
  private reviewsService = inject(ReviewsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userData = inject(AuthService).userData;

  selectedReview = this.reviewsService.selectedReview;

  constructor() {
    effect(() => {
      if (!this.selectedReview()) return;

      if (this.selectedReview()?.user.id !== this.userData().id) {
        this.router.navigate(['reviews']);
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!this.selectedReview()) {
      this.reviewsService.getReviewById(id);
    }
  }

  onReviewUpdate(req: Partial<AddReviewReq>) {
    this.reviewsService.updateReview(this.selectedReview().id, req);
  }
}
