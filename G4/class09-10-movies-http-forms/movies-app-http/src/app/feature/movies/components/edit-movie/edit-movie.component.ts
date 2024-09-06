import { Component, inject, OnInit } from '@angular/core';
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { MoviesService } from '../../../../core/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewFormValue } from '../../models/movie.model';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  selectedMovie = this.moviesService.selectedMovie;

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];

    this.moviesService.getMovieById(Number(id));
  }

  onEditMovie(value: ReviewFormValue) {
    console.log('Edit submit', value);

    console.log(this.selectedMovie());

    this.moviesService.updateMovie(this.selectedMovie().id, value);
  }
}
