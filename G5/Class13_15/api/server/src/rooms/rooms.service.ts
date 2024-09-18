import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { Response } from '../common/types/response.interface';
import generateFakeRooms from '../faker/generate-fake-rooms.helper';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomRepository.save(createRoomDto);
  }

  async findAll(searchQuery: SearchQueryDto): Promise<Response<Room[]>> {
    const {
      searchTerm,
      type,
      pricePerNightMin,
      pricePerNightMax,
      beds,
      extraBeds,
      baths,
      guestCapacity,
      view,
      parking,
      isPetFriendly,
      board,
      hasAirConditioning,
      availableFrom,
      availableTo,
      page,
      pageSize,
      sortBy,
      sortDirection,
    } = searchQuery;

    const query = this.roomRepository
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.bookings', 'bookings')
      .loadRelationCountAndMap('rooms.bookingsCount', 'rooms.bookings')
      .select([
        'rooms.id',
        'rooms.name',
        'rooms.description',
        'rooms.type',
        'rooms.pricePerNight',
        'rooms.beds',
        'rooms.extraBeds',
        'rooms.baths',
        'rooms.guestCapacity',
        'rooms.view',
        'rooms.images',
        'rooms.city',
        'rooms.country',
        'rooms.parking',
        'rooms.isPetFriendly',
        'rooms.board',
        'rooms.hasAirConditioning',
      ])
      .addSelect('COUNT(bookings.id)', 'bookingsCount')
      .groupBy('rooms.id');

    if (searchTerm) {
      query
        .orWhere('rooms.name ILIKE :name', { name: `%${searchTerm}%` })
        .orWhere('rooms.description ILIKE :description', {
          description: `%${searchTerm}%`,
        });
    }

    if (type) {
      query.andWhere('rooms.type = :type', { type });
    }

    if (pricePerNightMin && pricePerNightMax) {
      query.andWhere(
        'rooms.pricePerNight >= :pricePerNightMin AND rooms.pricePerNight <= :pricePerNightMax',
        {
          pricePerNightMin,
          pricePerNightMax,
        },
      );
    } else if (pricePerNightMin) {
      query.andWhere('rooms.pricePerNight >= :pricePerNightMin', {
        pricePerNightMin,
      });
    } else if (pricePerNightMax) {
      query.andWhere('rooms.pricePerNight <= :pricePerNightMax', {
        pricePerNightMax,
      });
    }

    if (beds) {
      query.andWhere('rooms.beds >= :beds', { beds });
    }

    if (extraBeds) {
      query.andWhere('rooms.extraBeds >= :extraBeds', { extraBeds });
    }

    if (baths) {
      query.andWhere('rooms.baths >= :baths', { baths });
    }

    if (guestCapacity) {
      query.andWhere('rooms.guestCapacity >= :guestCapacity', {
        guestCapacity,
      });
    }

    if (view) {
      query.andWhere('rooms.view = :view', { view });
    }

    if (parking) {
      query.andWhere('rooms.parking = :parking', { parking });
    }

    if (isPetFriendly) {
      query.andWhere('rooms.isPetFriendly = :isPetFriendly', {
        isPetFriendly,
      });
    }

    if (board) {
      query.andWhere('rooms.board = :board', { board });
    }

    if (hasAirConditioning) {
      query.andWhere('rooms.hasAirConditioning = :hasAirConditioning', {
        hasAirConditioning,
      });
    }

    if (availableFrom || availableTo) {
      const fromDate = availableFrom ? new Date(availableFrom) : new Date();
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth();
      const year = now.getFullYear();
      const endOfYear = new Date(year, month, day);
      const toDate = availableTo ? new Date(availableTo) : endOfYear;
      query.andWhere(
        '((booking.startDate >= :toDate OR booking.endDate <= :fromDate) OR booking.id IS NULL)',
        {
          toDate,
          fromDate,
        },
      );
    }

    const [rooms, total] = await query
      .orderBy(`rooms.${sortBy}`, sortDirection)
      .take(pageSize)
      .skip(pageSize * page)
      .getManyAndCount();

    return { payload: rooms, total };
  }

  findOne(id: string): Promise<Room> {
    try {
      return this.roomRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.findOne(id);

    try {
      await this.roomRepository.update(id, updateRoomDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        error,
        `Error while updating room with id ${id}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    await this.roomRepository.softDelete(id);
  }

  backfillRooms(count: number = 50) {
    // run clean up
    this.roomRepository.delete({});

    // insert new data
    this.roomRepository.insert(generateFakeRooms(count));
  }
}
