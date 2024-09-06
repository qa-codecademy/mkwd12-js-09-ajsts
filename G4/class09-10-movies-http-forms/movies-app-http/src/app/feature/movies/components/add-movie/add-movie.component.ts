import { Component, inject } from '@angular/core';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { ReviewFormValue } from '../../models/movie.model';
import { MoviesService } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent {
  private movieService = inject(MoviesService);

  onAddMovie(value: ReviewFormValue) {
    console.log('Add submit', value);
    this.movieService.createMovie(value);
  }
}
