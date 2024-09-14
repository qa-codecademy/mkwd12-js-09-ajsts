import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id of the room the guest is booked in',
    example: '00000000-0000-0000-0000-000000000000',
  })
  roomId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id of the guest booked in the room',
    example: '00000000-0000-0000-0000-000000000000',
  })
  guestId: string;

  @IsDateString()
  @IsDefined()
  @ApiProperty({
    description: 'Date when the booking starts',
    example: '2023-01-01',
  })
  startDate: Date;

  @IsDateString()
  @IsDefined()
  @ApiProperty({
    description: 'Date when the booking ends',
    example: '2023-01-02',
  })
  endDate: Date;
}
