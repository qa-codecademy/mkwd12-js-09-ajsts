import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies.service';
import { Movie } from '../../movies.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.moviesService.moviesEmitter.subscribe((value) => {
      console.log('movies emit event');
      console.log(value);
      this.movies = value;
    });

    const orderBy = this.route.snapshot.queryParams['orderBy'];

    if (orderBy) this.moviesService.getMovies(orderBy);
    else this.moviesService.getMovies();
  }

  onSelectMovie(movie: Movie) {
    this.router.navigate(['details', movie.id]);
    this.moviesService.selectMovie(movie);
  }
}
