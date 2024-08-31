import { Component, inject } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger.service';
import { MoviesService } from '../../../../core/services/movies.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  private loggerService = inject(LoggerService);
  private moviesService = inject(MoviesService);
  //ActivatedRoute contains all the information about the route that led to the rendering of this component such as: url, params, queryParams etc.
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  //This is a reference to the property in the service not a new object/signal
  selectedMovie = this.moviesService.selectedMovie;

  ngOnInit(): void {
    this.loggerService.logDetails('Movie Details');

    const id: string = this.route.snapshot.params['id'];

    this.moviesService.getMovieById(Number(id));
  }

  onClickLikeDislike(type: 'LIKE' | 'DISLIKE') {
    //Call service method with type to like or dislike
    console.log('like/dislike method called');

    this.moviesService.addLikeDislike(type, this.selectedMovie().id);
  }

  goToEditMovie() {
    this.router.navigate(['edit-movie', this.selectedMovie().id]);
  }
}
