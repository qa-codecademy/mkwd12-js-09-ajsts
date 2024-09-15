import { inject, Injectable, signal } from '@angular/core';
import { ReviewsApiService } from './reviews-api.service';
import { Review, ReviewComment } from '../../feature/reviews/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiService = inject(ReviewsApiService);

  reviews = signal<Review[]>([]);
  totalCount = signal(0);
  selectedReview = signal<Review>(null);

  commentsTotalCount = signal(0);
  comments = signal<ReviewComment[]>([]);

  getReviews(firstResult: number = 1, maxResults: number = 10) {
    this.apiService.fetchReviews(firstResult, maxResults).subscribe({
      next: (res) => {
        this.reviews.set(res.reviews);
        this.totalCount.set(res.totalCount);
      },
      error: (err) => console.log(err),
    });
  }

  getReviewById(reviewId: number) {
    this.apiService.fetchReviewById(reviewId).subscribe({
      next: (review) => {
        this.selectedReview.set(review);
        this.comments.set([]);
        this.getReviewComments(reviewId);
      },
      error: (err) => console.log(err),
    });
  }

  getReviewComments(
    reviewId: number,
    firstResult: number = 1,
    maxResults: number = 10
  ) {
    this.apiService
      .fetchReviewComments(reviewId, firstResult, maxResults)
      .subscribe({
        next: (value) => {
          this.comments.update((prev) => [...prev, ...value.comments]);
          this.commentsTotalCount.set(value.totalCount);
        },
        error: (err) => console.log(err),
      });
  }

  createReviewComment(reviewId: number, text: string) {
    this.apiService.postReviewComment(reviewId, text).subscribe({
      next: () => {
        console.log('comment created');
        this.comments.set([]);
        this.getReviewComments(reviewId);
      },
      error: (err) => console.log(err),
    });
  }
}
