import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  Movie,
  ReviewFormValue,
} from '../../feature/movies/models/movie.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private http = inject(HttpClient);

  fetchMovies(orderBy: string) {
    const params: { [key: string]: string } = {};

    if (orderBy) params.orderBy = orderBy;

    return this.http.get<Movie[]>(`${BASE_URL}/movies`, {
      params,
    });

    // return this.http
    //   .get(`${BASE_URL}/movies`)
    //   .pipe(map((value) => value as Movie[]));
  }

  fetchMovieById(id: number) {
    return this.http.get<Movie>(`${BASE_URL}/movies/${id}`);
  }

  postMovie(addReviewReq: ReviewFormValue) {
    return this.http.post<Movie>(`${BASE_URL}/movies`, addReviewReq);
  }

  patchMovie(id: number, updateReviewReq: Partial<ReviewFormValue>) {
    return this.http.patch<Movie>(`${BASE_URL}/movies/${id}`, updateReviewReq);
  }
}
