import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { HoverShadowDirective } from '../../core/directives/hover-shadow.directive';

@NgModule({
  declarations: [
    MoviesPageComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieItemComponent,
    HoverShadowDirective,
  ],
  imports: [CommonModule, ButtonComponent],

  //If the module that imports this module needs to use any of the declared components/directives they have to be exported
  exports: [MoviesPageComponent],
})
export class MoviesModule {}
