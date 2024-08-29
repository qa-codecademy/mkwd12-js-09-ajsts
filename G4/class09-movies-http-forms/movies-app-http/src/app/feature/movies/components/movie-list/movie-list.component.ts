import { Component, inject, OnInit } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { MoviesService } from '../../../../core/services/movies.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //This is a reference to the property in the service not a new object/signal
  movies = this.moviesService.movies;

  totalLikes = this.moviesService.totalLikes;

  ngOnInit(): void {
    // console.log('on init in movies list');
    // console.log(this.moviesService.movies);
    const orderBy = this.route.snapshot.queryParams['orderBy'];

    console.log(orderBy);

    this.loggerService.logDetails('Movie List');
    this.moviesService.getMovies(orderBy);
  }

  onMovieSelect(movie: Movie) {
    //Navigate to the movie details page
    this.moviesService.movieSelect(movie);
    this.router.navigate(['details', movie.id]);
  }
}
