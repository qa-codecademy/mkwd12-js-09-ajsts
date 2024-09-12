import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'First name of the guest',
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Last name of the guest',
    example: 'Doe',
  })
  lastName: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email of the guest',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsDateString()
  @ApiProperty({
    description: 'Date of birth of the guest',
    example: '1990-01-01',
  })
  dateOfBirth: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Phone number of the guest',
    example: '+38970223305',
  })
  phone: string;

  @ApiProperty({
    description: 'Address of the guest',
    example: 'Ilindenska 1, Skopje, Macedonia',
  })
  address: string;

  @ApiProperty({
    description: 'Passport number of the guest',
    example: 'A123456789',
  })
  passportNumber: string;
}
