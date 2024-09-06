import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Movie,
  ReviewFormValue,
} from '../../feature/movies/models/movie.model';
import { MoviesApiService } from './movies-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiService = inject(MoviesApiService);
  private router = inject(Router);

  movies = signal<Movie[]>([]);

  //Computed runs when any of the signals referenced inside changes its value
  totalLikes = computed(() =>
    this.movies().reduce((acc, el) => acc + el.likeCount, 0)
  );

  selectedMovie = signal<Movie>(null);

  getMovies(orderBy: string) {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data: Movie[]) => this.movies.set(data))
    //   .catch((err) => console.log(err));
    this.apiService.fetchMovies(orderBy).subscribe({
      next: (value) => this.movies.set(value),
      error: (err) => console.log(err),
    });
  }

  getMovieById(id: number) {
    //We check if selected movie has a value to avoid unnecessary calls to the endpoint , it will only be called when refreshing the page
    if (this.selectedMovie()) return;

    this.apiService.fetchMovieById(id).subscribe({
      next: (value) => this.selectedMovie.set(value),
      error: (err) => console.log(err),
    });
  }

  createMovie(addReviewReq: ReviewFormValue) {
    this.apiService.postMovie(addReviewReq).subscribe({
      next: (newMovie) => {
        this.movieSelect(newMovie);
        this.router.navigate(['details', newMovie.id]);
      },
      error: (err) => console.log(err),
    });
  }

  updateMovie(id: number, updateReviewReq: Partial<ReviewFormValue>) {
    this.apiService.patchMovie(id, updateReviewReq).subscribe({
      next: (updatedMovie) => {
        this.movieSelect(updatedMovie);
        this.router.navigate(['details', updatedMovie.id]);
      },
      error: (err) => console.log(err),
    });
  }

  movieSelect(movie: Movie) {
    console.log('movie select called');
    this.selectedMovie.set(movie);
  }

  addLikeDislike(type: 'LIKE' | 'DISLIKE', movieId: number) {
    this.movies.update((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === movieId) {
          // if (type === 'LIKE') movie.likeCount = movie.likeCount + 1;
          // if (type === 'DISLIKE') movie.likeCount = movie.likeCount - 1;
          // return movie;
          return {
            ...movie,
            likeCount:
              type === 'LIKE' ? movie.likeCount + 1 : movie.likeCount - 1,
          };
        }

        return movie;
      })
    );
  }
}
