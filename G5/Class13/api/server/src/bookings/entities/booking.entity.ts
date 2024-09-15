import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';
import { Guest } from '../../guests/entities/guest.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @Column()
  roomId: string;

  @ManyToOne(() => Guest, (guest) => guest.bookings)
  guest: Guest;

  @Column()
  guestId: string;

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
