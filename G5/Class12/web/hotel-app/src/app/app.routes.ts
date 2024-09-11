import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'rooms',
    children: [
      // { path: '', component: RoomsPageComponent },
      // { path: ':id', component: RoomDetailsComponent }
      {
        path: '',
        loadComponent: () =>
          import('./rooms-page/rooms-page.component').then(
            (c) => c.RoomsPageComponent,
          ),
      },
      {
        path: ':id', // rooms/ovde_nesto
        loadComponent: () =>
          import('./room-details/room-details.component').then(
            (c) => c.RoomDetailsComponent,
          ),
      },
    ],
  },
  // { path: 'guests', component: GuestsComponent },
  {
    path: 'guests',
    loadComponent: () =>
      import('./guests/guests.component').then((c) => c.GuestsComponent),
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
