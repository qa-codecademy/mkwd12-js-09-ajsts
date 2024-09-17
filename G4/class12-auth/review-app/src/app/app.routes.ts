import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';
import { ReviewsListComponent } from './feature/reviews/components/reviews-list/reviews-list.component';
import { authGuard } from './core/guards';
import { ReviewDetailsComponent } from './feature/reviews/components/review-details/review-details.component';
import { AddReviewComponent } from './feature/reviews/components/add-review/add-review.component';
import { EditReviewComponent } from './feature/reviews/components/edit-review/edit-review.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'reviews',
    component: ReviewsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-review',
    component: AddReviewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-review/:id',
    component: EditReviewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    component: ReviewDetailsComponent,
    canActivate: [authGuard],
  },
];
