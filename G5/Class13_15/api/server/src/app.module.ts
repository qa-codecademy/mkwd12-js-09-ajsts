import { Module } from '@nestjs/common';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsService } from './bookings/bookings.service';
import { GuestsController } from './guests/guests.controller';
import { GuestsService } from './guests/guests.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings/entities/booking.entity';
import { Guest } from './guests/entities/guest.entity';
import { Room } from './rooms/entities/room.entity';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Booking, Guest, Room, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '1h' },
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [
    RoomsController,
    BookingsController,
    GuestsController,
    UsersController,
    AuthController,
  ],
  providers: [
    RoomsService,
    BookingsService,
    GuestsService,
    UsersService,
    AuthService,
    JwtStrategy,
  ],
  exports: [],
})
export class AppModule {}
