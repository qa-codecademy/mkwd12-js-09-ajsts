import { Component, Input } from '@angular/core';
import { Movie } from '../../movies.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
})
export class MovieItemComponent {
  @Input({ required: true }) movie: Movie;
}
