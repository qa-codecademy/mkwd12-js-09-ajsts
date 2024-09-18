import { ParkingType } from '../../common/types/parking-type.enum';
import { RoomType } from '../../common/types/room-type.enum';
import { RoomView } from '../../common/types/room-view.enum';
import { Board } from '../../common/types/board.enum';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { SortDirection } from '../../common/types/sort-direction.enum';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Search term to filter rooms by name or description',
  })
  searchTerm?: string;

  @IsOptional()
  @IsEnum(RoomType)
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Filter rooms by type',
    enum: RoomType,
  })
  type?: RoomType;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter rooms by minimum price per night',
  })
  pricePerNightMin?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter rooms by maximum price per night',
  })
  pricePerNightMax?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter rooms by minimum beds in the room',
  })
  beds?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional({
    description:
      'Filter rooms by minimum extra beds that can be added in the room',
  })
  extraBeds?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter rooms by minimum baths in the room',
  })
  baths?: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter rooms by minimum guest capacity in the room',
  })
  guestCapacity?: number;

  @IsOptional()
  @IsEnum(RoomView)
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Filter rooms by view type',
    enum: RoomView,
  })
  view?: RoomView;

  @IsOptional()
  @IsEnum(ParkingType)
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Filter rooms that have parking by paid or free',
    enum: ParkingType,
  })
  parking?: ParkingType;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({
    description: 'Filter rooms that are pet friendly',
  })
  isPetFriendly?: boolean;

  @IsOptional()
  @IsEnum(Board)
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Filter rooms by board type',
    enum: Board,
  })
  board?: Board;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({
    description: 'Filter rooms with air conditioning',
  })
  hasAirConditioning?: boolean;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter rooms that are available from some date',
  })
  availableFrom?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Filter rooms that are available to some date. If used, "availableFrom" must be set as well',
  })
  availableTo?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page number',
    example: 0,
    default: 0,
  })
  page: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Page size',
    example: 10,
    default: 10,
  })
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Sort by',
  })
  sortBy?: string = 'name';

  @IsEnum(SortDirection)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: SortDirection,
  })
  sortDirection?: SortDirection = SortDirection.Asc;
}
