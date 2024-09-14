import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { RoomType } from '../../common/types/room-type.enum';
import { RoomView } from '../../common/types/room-view.enum';
import { ParkingType } from '../../common/types/parking-type.enum';
import { Board } from '../../common/types/board.enum';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    description: 'Name of the room',
    example: 'Deluxe Sea View Room',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({
    description: 'Description of the room',
    example:
      'Spacious room featuring a private balcony with stunning sea views, a king-sized bed, and modern amenities including free Wi-Fi, a flat-screen TV, and a minibar.',
  })
  description: string;

  @IsEnum(RoomType)
  @ApiProperty({
    description: 'Type of the room',
    enum: RoomType,
    example: RoomType.Suite,
  })
  type: RoomType;

  @IsNumber()
  @ApiProperty({
    description: 'Price per night in the room',
    example: 250,
  })
  pricePerNight: number;

  @IsInt()
  @ApiProperty({
    description: 'Number of beds in the room',
    example: 1,
  })
  beds: number;

  @IsInt()
  @ApiProperty({
    description: 'Number of extra beds in the room',
    example: 0,
  })
  extraBeds: number;

  @IsInt()
  @ApiProperty({
    description: 'Number of baths in the room',
    example: 1,
  })
  baths: number;

  @IsInt()
  @ApiProperty({
    description: 'Number of guest capacity in the room',
    example: 1,
  })
  guestCapacity: number;

  @IsEnum(RoomView)
  @ApiProperty({
    description: 'View type of the room',
    enum: RoomView,
    example: RoomView.Sea,
  })
  view: RoomView;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Images of the room',
    example: ['./room-images/7.webp'],
  })
  images: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'City of the room',
    example: 'Skopje',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Country of the room',
    example: 'Macedonia',
  })
  country: string;

  @IsEnum(ParkingType)
  @ApiProperty({
    description: 'Parking type of the room',
    enum: ParkingType,
    example: ParkingType.Free,
  })
  parking: ParkingType;

  @IsEnum(Board)
  @ApiProperty({
    description: 'Type of food service provided',
    enum: Board,
    example: Board.None,
  })
  board: Board;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'If the room is pet friendly',
    example: false,
    default: false,
  })
  isPetFriendly: boolean = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'If the room has air conditioning',
    example: false,
    default: false,
  })
  hasAirConditioning: boolean = false;
}
