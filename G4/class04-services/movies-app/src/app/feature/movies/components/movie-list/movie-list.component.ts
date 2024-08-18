import { Component, inject, OnInit } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { MoviesService } from '../../../../core/services/movies.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieItemComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private loggerService = inject(LoggerService);

  //This is a reference to the property in the service not a new object/signal
  movies = this.moviesService.movies;

  ngOnInit(): void {
    // console.log('on init in movies list');
    // console.log(this.moviesService.movies);
    this.loggerService.logDetails('Movie List');
    this.moviesService.getMovies();
  }

  onMovieSelect(movie: Movie) {
    this.moviesService.movieSelect(movie);
  }
}
