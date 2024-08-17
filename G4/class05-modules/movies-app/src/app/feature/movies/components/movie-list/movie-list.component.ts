import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies.service';
import { Movie } from '../../movies.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.moviesEmitter.subscribe((value) => {
      console.log('movies emit event');
      console.log(value);
      this.movies = value;
    });

    this.moviesService.getMovies();
  }

  onSelectMovie(movie: Movie) {
    this.moviesService.selectMovie(movie);
  }
}
