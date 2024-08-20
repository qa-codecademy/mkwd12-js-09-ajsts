import { Component, input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
})
export class MovieItemComponent {
  movie = input.required<Movie>();
}
