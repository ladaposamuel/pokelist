import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pokemon } from './Pokemon.entity';
import { User } from './User.entity';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  status: string = 'active';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.organisation)
  pokemons!: Pokemon[];

  @OneToMany(() => User, (user) => user.organisation)
  users!: User[];
}
