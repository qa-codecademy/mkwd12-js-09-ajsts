import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Guest } from './entities/guest.entity';
import { SearchQueryDto } from './dto/search-query.dto';
import { Response } from '../common/types/response.interface';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/types/user-role.enum';
import { RolesValidationType } from '../common/types/roles-validation-type.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Guests')
@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @ApiOperation({
    summary: 'Create a new guest',
    description: 'Creates a new guest',
  })
  @ApiCreatedResponse({
    description: 'Returns the created guest',
    type: Guest,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Post()
  create(@Body() createGuestDto: CreateGuestDto): Promise<Guest> {
    return this.guestsService.create(createGuestDto);
  }

  @ApiOperation({
    summary: 'Find all guests',
    description: 'Find all guests',
  })
  @ApiOkResponse({
    description: 'Returns an array of guests as payload and total count',
    type: Response,
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Get()
  findAll(@Query() searchQueryDto: SearchQueryDto): Promise<Response<Guest[]>> {
    return this.guestsService.findAll(searchQueryDto);
  }

  @ApiOperation({
    summary: 'Find a guest by id',
    description: 'Find a guest by id',
  })
  @ApiOkResponse({
    description: 'Returns a guest',
    type: Guest,
  })
  @ApiNotFoundResponse({
    description: 'Guest not found',
    type: NotFoundException,
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Guest> {
    return this.guestsService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a guest by id',
    description: 'Update a guest by id',
  })
  @ApiOkResponse({
    description: 'Returns the updated guest',
    type: Guest,
  })
  @ApiNotFoundResponse({
    description: 'Guest not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuestDto: UpdateGuestDto,
  ): Promise<Guest> {
    return this.guestsService.update(id, updateGuestDto);
  }

  @ApiOperation({
    summary: 'Delete a guest by id',
    description: 'Delete a guest by id',
  })
  @ApiOkResponse({
    description: 'Returns nothing',
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.guestsService.remove(id);
  }
}
