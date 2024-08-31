import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { AboutComponent } from './feature/about/about.component';
import { AddMovieComponent } from './feature/movies/components/add-movie/add-movie.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { EditMovieComponent } from './feature/movies/components/edit-movie/edit-movie.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  // {
  //   path: 'movies',
  //   component: MovieListComponent,

  // },
  // {
  //   path: 'details/:id',
  //   component: MovieDetailsComponent,
  // },
  {
    path: 'movies',
    loadComponent: () =>
      import(
        './feature/movies/components/movie-list/movie-list.component'
      ).then((c) => c.MovieListComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import(
        './feature/movies/components/movie-details/movie-details.component'
      ).then((c) => c.MovieDetailsComponent),
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
  {
    path: 'edit-movie/:id',
    component: EditMovieComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
