import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Organisation } from './Organisation.entity';
import { Favorite } from './Favorite.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'text' })
  description: string = '';

  @Column({ type: 'varchar' })
  image!: string;

  @Column({ type: 'varchar' })
  type!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @ManyToOne(() => Organisation, (organisation) => organisation.pokemons)
  organisation!: Organisation;

  @OneToMany(() => Favorite, (favorite) => favorite.pokemon)
  favorites!: Favorite[];
}
