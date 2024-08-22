import { Movie } from './movies.model';

export const moviesMock: Movie[] = [
  {
    id: 1,
    title: 'The Godfather',
    year: 1971,
    genres: 'drama, crime',
    rating: 10,
    text: 'A landmark of cinema',
    author: 'Borche',
    likeCount: 523,
    director: 'Francis Ford Copolla',
  },
  {
    id: 2,
    title: 'The Matrix',
    year: 1971,
    genres: 'sci-fi, action',
    rating: 9,
    text: 'One of the best sci-fi epics of the 20th century',
    author: 'Borche',
    likeCount: 523,
    director: 'The Wachowskis',
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    year: 1994,
    genres: 'crime, drama',
    rating: 9,
    text: "Tarantion's best work by far",
    author: 'John',
    likeCount: 321,
    director: 'Quentin Tarantino',
  },
];
