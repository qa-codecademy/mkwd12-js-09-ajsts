import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', 
    children: [
      // { path: '', component: RoomsPageComponent },
      // { path: ':id', component: RoomDetailsComponent }
      { path: '', 
        loadComponent: () => import('./rooms-page/rooms-page.component').then((c) => c.RoomsPageComponent)
      },
      { path: ':id', 
        loadComponent: () => import('./room-details/room-details.component').then((c) => c.RoomDetailsComponent)
      },
    ]
  },
  // { path: 'guests', component: GuestsComponent },
  {
    path: 'guests',
    loadComponent: () => 
      import('./guests/guests.component').then((c) => c.GuestsComponent)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
