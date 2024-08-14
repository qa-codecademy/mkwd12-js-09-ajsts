import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Guest } from '../guests/entities/guest.entity';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const guest = await this.guestRepository.findOneBy({
      id: createBookingDto.guestId,
    });

    if (!guest) {
      throw new NotFoundException(
        `Guest with id ${createBookingDto.guestId} not found`,
      );
    }

    const now = new Date();

    // check if room exists and if is available
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.bookings', 'bookings')
      .where('room.id = :id', { id: createBookingDto.roomId })
      .andWhere(
        '((bookings.startDate >= :endDate OR bookings.endDate <= :startDate) OR bookings.id IS NULL)',
        {
          startDate: new Date(createBookingDto.startDate),
          endDate: new Date(createBookingDto.endDate),
        },
      )
      .getOne();

    if (!room) {
      throw new NotFoundException(
        `Room with id ${createBookingDto.roomId} is not available`,
      );
    }

    if (createBookingDto.startDate >= createBookingDto.endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (new Date(createBookingDto.startDate).getTime() < now.getTime()) {
      throw new BadRequestException('Start date must be in the future');
    }

    try {
      return this.bookingRepository.save(createBookingDto);
    } catch (error) {
      throw new BadRequestException(error, 'Error while creating booking');
    }
  }

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['room', 'guest'],
    });
  }

  findOne(id: string): Promise<Booking> {
    try {
      return this.bookingRepository.findOneOrFail({
        where: { id },
        relations: ['room', 'guest'],
      });
    } catch (error) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    await this.findOne(id);

    try {
      await this.bookingRepository.update(id, updateBookingDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(error, 'Error while updating booking');
    }
  }

  async remove(id: string): Promise<void> {
    await this.bookingRepository.softDelete(id);
  }
}
