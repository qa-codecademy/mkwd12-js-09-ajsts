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

export interface ReviewComment {
  id: number;
  text: string;
  added: string;
  user: {
    username: string;
  };
}

export interface GetCommentsRes {
  comments: ReviewComment[];
  totalCount: number;
}
