import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { HoverShadowDirective } from '../../core/directives/hover-shadow.directive';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieItemComponent,
    HoverShadowDirective,
    AddMovieComponent,
  ],
  imports: [CommonModule, MoviesRoutingModule, ButtonComponent],
})
export class MoviesModule {}
