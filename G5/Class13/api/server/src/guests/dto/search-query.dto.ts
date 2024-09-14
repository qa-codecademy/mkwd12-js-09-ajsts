import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: 'Search guest by email',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Search guest by name',
  })
  name?: string;
}
