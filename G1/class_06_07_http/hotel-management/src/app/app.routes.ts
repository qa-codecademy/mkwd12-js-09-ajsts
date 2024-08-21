import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';
import { RoomDetailsComponent } from './room-details/room-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'rooms',
    children: [
      { path: '', component: RoomsPageComponent },
      { path: ':id', component: RoomDetailsComponent },
    ],
  },
  { path: 'guests', component: HomeComponent }, // TODO: Replace with guests component
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
