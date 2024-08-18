import { computed, Injectable, signal } from '@angular/core';
import { Movie } from '../../feature/movies/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies = signal<Movie[]>([]);

  //Computed runs when any of the signals referenced inside changes its value
  totalLikes = computed(() =>
    this.movies().reduce((acc, el) => acc + el.likeCount, 0)
  );

  selectedMovie = signal<Movie>(null);

  getMovies() {
    fetch('http://localhost:3000/movies')
      .then((res) => res.json())
      .then((data: Movie[]) => this.movies.set(data))
      .catch((err) => console.log(err));
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
