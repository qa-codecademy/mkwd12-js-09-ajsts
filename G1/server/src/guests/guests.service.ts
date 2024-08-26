import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';
import { SearchQueryDto } from './dto/search-query.dto';
import { Response } from '../common/types/response.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createGuestDto: CreateGuestDto) {
    // check if guest is a registered user
    const user = await this.userRepository.findOneBy({
      email: createGuestDto.email,
    });

    try {
      return this.guestRepository.save(
        user ? { ...createGuestDto, userId: user.id } : createGuestDto,
      );
    } catch (error) {
      throw new BadRequestException(error, 'Error while creating guest');
    }
  }

  async findAll(searchQueryDto: SearchQueryDto): Promise<Response<Guest[]>> {
    const { email, name } = searchQueryDto;

    console.log(name);

    const query = this.guestRepository
      .createQueryBuilder('guests')
      .leftJoinAndSelect('guests.bookings', 'bookings');

    if (email) {
      query.andWhere('guests.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.orWhere('guests.firstName ILIKE :name', {
        name: `%${name}%`,
      });
      query.orWhere('guests.lastName ILIKE :name', {
        name: `%${name}%`,
      });
    }
    const [guests, total] = await query.getManyAndCount();

    return { payload: guests, total };
  }

  findOneById(id: string): Promise<Guest> {
    try {
      return this.guestRepository.findOneOrFail({
        where: { id },
        relations: ['bookings', 'bookings.room'],
      });
    } catch (error) {
      throw new BadRequestException(error, 'Error while finding guest');
    }
  }

  findOneByEmail(email: string): Promise<Guest> {
    try {
      return this.guestRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new BadRequestException(error, 'Error while finding guest');
    }
  }

  async update(id: string, updateGuestDto: UpdateGuestDto): Promise<Guest> {
    await this.findOneById(id);
    try {
      await this.guestRepository.update(id, updateGuestDto);
      return this.findOneById(id);
    } catch (error) {
      throw new BadRequestException(error, 'Error while updating guest');
    }
  }

  async remove(id: string): Promise<void> {
    await this.guestRepository.softDelete(id);
  }
}
