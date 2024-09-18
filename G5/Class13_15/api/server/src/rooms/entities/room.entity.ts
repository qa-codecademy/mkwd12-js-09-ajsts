import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomView } from '../../common/types/room-view.enum';
import { ParkingType } from '../../common/types/parking-type.enum';
import { Board } from '../../common/types/board.enum';
import { RoomType } from '../../common/types/room-type.enum';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: RoomType,
    default: RoomType.Double,
  })
  type: RoomType;

  @Column({
    type: 'float',
  })
  pricePerNight: number;

  @Column({
    type: 'int',
    default: 1,
  })
  beds: number;

  @Column({
    type: 'int',
    default: 0,
  })
  extraBeds: number;

  @Column({
    type: 'int',
    default: 1,
  })
  baths: number;

  @Column({
    type: 'int',
    default: 1,
  })
  guestCapacity: number;

  @Column({
    type: 'enum',
    enum: RoomView,
    default: RoomView.None,
  })
  view: RoomView;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  images: string[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  country: string | null;

  @Column({
    type: 'enum',
    enum: ParkingType,
    default: ParkingType.None,
  })
  parking: ParkingType;

  @Column({
    type: 'enum',
    enum: Board,
    default: Board.None,
  })
  board: Board;

  @Column({
    type: 'boolean',
    default: false,
  })
  isPetFriendly: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  hasAirConditioning: boolean;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  createdBy: string | null;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date | null;

  @Column({
    nullable: true,
  })
  updatedBy: string | null;

  @DeleteDateColumn({
    nullable: true,
    select: false,
  })
  deletedAt: Date | null;

  @Column({
    nullable: true,
    select: false,
  })
  deletedBy: string | null;
}
