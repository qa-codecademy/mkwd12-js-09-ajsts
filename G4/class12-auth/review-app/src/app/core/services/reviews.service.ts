import { inject, Injectable, signal } from '@angular/core';
import { ReviewsApiService } from './reviews-api.service';
import { Review } from '../../feature/reviews/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiService = inject(ReviewsApiService);

  reviews = signal<Review[]>([]);
  totalCount = signal(0);

  getReviews(firstResult: number = 1, maxResults: number = 10) {
    this.apiService.fetchReviews(firstResult, maxResults).subscribe({
      next: (res) => {
        this.reviews.set(res.reviews);
        this.totalCount.set(res.totalCount);
      },
      error: (err) => console.log(err),
    });
  }
}
