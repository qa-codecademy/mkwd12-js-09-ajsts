import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { BackfillRoomsQuery } from './dto/backfill-rooms-query.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Room } from './entities/room.entity';
import { Response } from '../common/types/response.interface';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/types/user-role.enum';
import { RolesValidationType } from '../common/types/roles-validation-type.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new room',
    description: 'Creates a new room',
  })
  @ApiCreatedResponse({
    description: 'Returns the created room',
    type: Room,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Find all rooms',
    description: 'Find all rooms',
  })
  @ApiOkResponse({
    description: 'Returns an array of rooms',
    type: Response,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  findAll(@Query() searchQuery: SearchQueryDto): Promise<Response<Room[]>> {
    return this.roomsService.findAll(searchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Find a room by id',
    description: 'Find a room by id',
  })
  @ApiOkResponse({
    description: 'Returns a room',
    type: Room,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles(
    [UserRole.Guest, UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a room by id',
    description: 'Update a room by id',
  })
  @ApiOkResponse({
    description: 'Returns the updated room',
    type: Room,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a room by id',
    description: 'Delete a room by id',
  })
  @ApiOkResponse({
    description: 'Returns nothing',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles(
    [UserRole.Employee, UserRole.Admin],
    RolesValidationType.HasSomeOfThese,
  )
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }

  @Post('backfill')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Backfill rooms',
    description: 'Backfill rooms',
  })
  @ApiOkResponse({
    description: 'Returns created rooms',
    type: Room,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  backfillRooms(@Query() query: BackfillRoomsQuery) {
    return this.roomsService.backfillRooms(query.count);
  }
}
