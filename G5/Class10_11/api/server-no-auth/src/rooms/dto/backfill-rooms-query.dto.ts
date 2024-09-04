import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BackfillRoomsQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Number of rooms to backfill',
    example: 50,
    default: 50,
  })
  count?: number = 50;
}
