import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
import { User } from '../../users/entities/user.entity';

@Unique(['email'])
@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  dateOfBirth: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  passportNumber: string;

  @OneToMany(() => Booking, (booking) => booking.guest)
  bookings: Booking[];

  @OneToOne(() => User, (user) => user.guest)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    nullable: true,
  })
  userId: string | null;

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
