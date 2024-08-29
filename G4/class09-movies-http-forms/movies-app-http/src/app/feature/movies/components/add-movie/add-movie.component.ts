import { Component } from '@angular/core';
import { MovieFormComponent } from '../movie-form/movie-form.component';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent {}
