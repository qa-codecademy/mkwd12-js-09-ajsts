import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies.service';
import { Movie } from '../../movies.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  selectedMovie: Movie = null;

  constructor(private moviesService: MoviesService) {
    this.moviesService.logInfo();
  }

  ngOnInit() {
    this.moviesService.selectedMovieEmitter.subscribe((value) => {
      this.selectedMovie = value;
    });
  }

  onAddLikeDislike(type: 'LIKE' | 'DISLIKE') {
    this.moviesService.addLikeDislike(type, this.selectedMovie.id);
  }
}
