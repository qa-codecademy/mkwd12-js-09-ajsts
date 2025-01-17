import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../core.constants';
import {
  AddReviewReq,
  GetCommentsRes,
  GetReviewsRes,
  Review,
  ReviewComment,
} from '../../feature/reviews/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsApiService {
  private http = inject(HttpClient);

  fetchReviews(firstResult: number, maxResults: number) {
    return this.http.get<GetReviewsRes>(`${BASE_URL}/reviews`, {
      params: {
        firstResult,
        maxResults,
      },
    });
  }

  fetchReviewById(reviewId: number) {
    return this.http.get<Review>(`${BASE_URL}/reviews/${reviewId}`);
  }

  fetchReviewComments(
    reviewId: number,
    firstResult: number,
    maxResults: number
  ) {
    return this.http.get<GetCommentsRes>(
      `${BASE_URL}/comments/review/${reviewId}`,
      {
        params: {
          firstResult,
          maxResults,
        },
      }
    );
  }

  postReviewComment(reviewId: number, text: string) {
    return this.http.post(`${BASE_URL}/comments`, { text, reviewId });
  }

  addLikeDislike(reviewId: number, type: 'LIKE' | 'DISLIKE') {
    return this.http.post(`${BASE_URL}/reviews/${reviewId}/add-like-dislike`, {
      type,
    });
  }

  postReview(req: AddReviewReq) {
    return this.http.post<Review>(`${BASE_URL}/reviews`, req);
  }

  patchReview(reviewId: number, req: Partial<AddReviewReq>) {
    return this.http.patch(`${BASE_URL}/reviews/${reviewId}`, req);
  }
}
