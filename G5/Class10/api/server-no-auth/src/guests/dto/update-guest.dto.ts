import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateGuestDto } from './create-guest.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateGuestDto extends PartialType(CreateGuestDto) {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'Id of the user the guest is booked in',
    example: '00000000-0000-0000-0000-000000000000',
  })
  userId?: string;
}
