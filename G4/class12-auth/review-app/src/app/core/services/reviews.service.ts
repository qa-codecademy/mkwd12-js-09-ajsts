import { inject, Injectable, signal } from '@angular/core';
import { ReviewsApiService } from './reviews-api.service';
import {
  AddReviewReq,
  Review,
  ReviewComment,
} from '../../feature/reviews/review.model';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiService = inject(ReviewsApiService);
  private notificationsService = inject(NotificationsService);
  private router = inject(Router);

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
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
    });
  }

  getReviewById(reviewId: number) {
    this.apiService.fetchReviewById(reviewId).subscribe({
      next: (review) => {
        this.selectedReview.set(review);
        this.comments.set([]);
        this.getReviewComments(reviewId);
      },
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
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
        error: (err) =>
          this.notificationsService.showToast(err.error.message, false),
      });
  }

  addLikeDislike(reviewId: number, type: 'LIKE' | 'DISLIKE') {
    this.apiService.addLikeDislike(reviewId, type).subscribe({
      next: () => this.getReviewById(reviewId),
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
    });
  }

  createReviewComment(reviewId: number, text: string) {
    this.apiService.postReviewComment(reviewId, text).subscribe({
      next: () => {
        this.notificationsService.showToast('Comment Added!', true);
        this.comments.set([]);
        this.getReviewComments(reviewId);
      },
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
    });
  }

  addReview(req: AddReviewReq) {
    this.apiService.postReview(req).subscribe({
      next: (review) => {
        this.notificationsService.showToast(
          'Review succesfully created!',
          true
        );

        this.router.navigate(['details', review.id]);
      },
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
    });
  }

  updateReview(reviewId: number, req: Partial<AddReviewReq>) {
    this.apiService.patchReview(reviewId, req).subscribe({
      next: () => {
        this.notificationsService.showToast(
          'Review succesfully updated!',
          true
        );

        this.router.navigate(['details', reviewId]);
      },
      error: (err) =>
        this.notificationsService.showToast(err.error.message, false),
    });
  }
}
