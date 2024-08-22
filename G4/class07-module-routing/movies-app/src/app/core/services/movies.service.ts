import { EventEmitter, Injectable } from '@angular/core';
import { Movie } from '../../feature/movies/movies.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Movie[] = [];

  moviesEmitter = new EventEmitter<Movie[]>();
  selectedMovieEmitter = new EventEmitter<Movie>();

  getMovies(orderBy?: string) {
    let url = 'http://localhost:3000/movies';

    if (orderBy) {
      url = `http://localhost:3000/movies?orderBy=${orderBy}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data: Movie[]) => {
        this.movies = data;
        this.moviesEmitter.emit(this.movies);
      })
      .catch((err) => console.log(err));
  }

  getMovieById(id: number) {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data: Movie) => this.selectedMovieEmitter.emit(data))
      .catch((err) => console.log(err));
  }

  logInfo() {
    console.log('logged from service');
  }

  selectMovie(movie: Movie) {
    console.log('select movie called');
    this.selectedMovieEmitter.emit(movie);
  }

  addLikeDislike(type: 'LIKE' | 'DISLIKE', movieId: number) {
    //Update the movies property
    this.movies.forEach((movie) => {
      if (movie.id === movieId) {
        if (type === 'LIKE') movie.likeCount++;
        if (type === 'DISLIKE') movie.likeCount--;
      }
    });

    console.log(this.movies);

    //Emit the new movies property
    this.moviesEmitter.emit(this.movies);
  }
}
