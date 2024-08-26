import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuestsComponent } from './guests/guests.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guests', component: GuestsComponent },
  // {
  //   path: 'guests',
  //   loadComponent: () => 
  //     import('./guests/guests.component').then((c) => c.GuestsComponent)
  // },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
