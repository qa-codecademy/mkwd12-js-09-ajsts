import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../core.constants';
import { GetReviewsRes } from '../../feature/reviews/review.model';

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
}
