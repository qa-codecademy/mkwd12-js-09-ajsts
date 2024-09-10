import { User } from '../auth/auth.model';

export interface Review {
  id: number;
  title: string;
  year: number;
  genres: string;
  rating: number;
  text: string;
  director: string;
  poster: string;
  likes: string[];
  dislikes: string[];
  user: User;
  //TODO Need to add typescript safety here
  comments: any[];
}

export interface GetReviewsRes {
  reviews: Review[];
  totalCount: number;
}
