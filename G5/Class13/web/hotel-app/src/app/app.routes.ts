import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../guards/auth.guard';
import { UserRole } from '../types/user-role.enum';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'rooms',
    canActivate: [authGuard],

    children: [
      {
        path: '',
        // canActivate: [someGuard], // guard per children route
        loadComponent: () =>
          import('./rooms-page/rooms-page.component').then(
            (c) => c.RoomsPageComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./room-details/room-details.component').then(
            (c) => c.RoomDetailsComponent,
          ),
      },
    ],
  },
  {
    path: 'guests',
    canActivate: [authGuard],
    data: { roles: [UserRole.Employee, UserRole.Admin] },
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
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
