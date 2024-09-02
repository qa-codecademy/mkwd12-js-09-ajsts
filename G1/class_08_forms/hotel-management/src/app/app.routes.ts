import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomsPageComponent } from './rooms-page/rooms-page.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { GuestsComponent } from './guests/guests.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'rooms',
    children: [
      { path: '', component: RoomsPageComponent },
      { path: ':id', component: RoomDetailsComponent },
      { path: ':id/add-guest', component: BookRoomComponent },
    ],
  },
  { path: 'guests', component: GuestsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
