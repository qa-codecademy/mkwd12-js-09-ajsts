import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from '../guests/entities/guest.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from '../common/types/user-role.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUserDto);

      const guest = await this.guestRepository.findOneBy({
        email: createUserDto.email,
      });

      if (guest) {
        await this.guestRepository.update(guest.id, { userId: user.id });
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error, 'Error while creating user');
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: string): Promise<User> {
    try {
      return this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  findOneByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOneById(id);
    try {
      await this.userRepository.update(id, updateUserDto);
      return this.findOneById(id);
    } catch (error) {
      throw new BadRequestException(error, 'Error while updating user');
    }
  }

  async updateRole(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<User> {
    await this.findOneById(id);

    try {
      await this.userRepository.update(id, updateUserRoleDto);
      return this.findOneById(id);
    } catch (error) {
      throw new BadRequestException(error, 'Error while updating user');
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async backfillUsers() {
    const admin = {
      id: '2a23b510-e5d1-4688-a9d6-01cb92afc87d',
      email: 'admin@example.com',
      password: 'Pas$w0rd',
      role: UserRole.Admin,
    } as User;

    const employee = {
      id: 'c65387fe-f156-4e67-9054-66e695dbee1c',
      email: 'employee@example.com',
      password: 'Pas$w0rd',
      role: UserRole.Employee,
    } as User;

    const guest = {
      id: 'd65387fe-f156-4e67-9054-66e695dbee1c',
      email: 'guest@example.com',
      password: 'Pas$w0rd',
      role: UserRole.Guest,
    } as User;

    try {
      const userResponse = await this.authService.backfillRegister([
        admin,
        employee,
        guest,
      ]);
      return userResponse;
    } catch (error) {
      console.error('Error while backfilling user', error);
    }
  }
}
