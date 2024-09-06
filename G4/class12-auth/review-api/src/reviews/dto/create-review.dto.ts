import { IsString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsString()
  genres: string;

  @IsNumber()
  rating: number;

  @IsString()
  text: string;

  @IsString()
  director: string;
}
