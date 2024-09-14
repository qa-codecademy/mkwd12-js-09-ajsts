import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/types/user-role.enum';
import { RolesValidationType } from '../common/types/roles-validation-type.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({
    summary: 'Create a new booking',
    description: 'Creates a new booking',
  })
  @ApiCreatedResponse({
    description: 'Returns the created booking',
    type: Booking,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Post()
  create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }

  @ApiOperation({
    summary: 'Find all bookings',
    description: 'Find all bookings',
  })
  @ApiOkResponse({
    description: 'Returns an array of bookings',
    type: Booking,
    isArray: true,
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @ApiOperation({
    summary: 'Find a booking by id',
    description: 'Find a booking by id',
  })
  @ApiOkResponse({
    description: 'Returns a booking',
    type: Booking,
  })
  @ApiNotFoundResponse({
    description: 'Booking not found',
    type: NotFoundException,
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a booking by id',
    description: 'Update a booking by id',
  })
  @ApiOkResponse({
    description: 'Returns the updated booking',
    type: Booking,
  })
  @ApiNotFoundResponse({
    description: 'Booking not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  @Patch(':id')
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @ApiOperation({
    summary: 'Delete a booking by id',
    description: 'Delete a booking by id',
  })
  @ApiOkResponse({
    description: 'Returns nothing',
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookingsService.remove(id);
  }
}
