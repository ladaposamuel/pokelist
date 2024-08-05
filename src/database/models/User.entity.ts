import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Organisation } from './Organisation.entity';
import { Favorite } from './Favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @ManyToOne(() => Organisation, (organisation) => organisation.users)
  organisation!: Organisation;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[];
}
