import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../common/types/user-role.enum';
import { Guest } from '../../guests/entities/guest.entity';
import { ApiProperty } from '@nestjs/swagger';

@Unique(['email'])
@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Guest,
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  refreshTokens: string[];

  @OneToOne(() => Guest, (guest) => guest.id)
  @JoinColumn({
    name: 'guestId',
    referencedColumnName: 'id',
  })
  guest: Guest;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  guestId: string | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  createdBy: string | null;

  @ApiProperty()
  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date | null;

  @ApiProperty()
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
