import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';
import { Pokemon } from './Pokemon.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'boolean' })
  liked!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  user!: User;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.favorites)
  pokemon!: Pokemon;
}
