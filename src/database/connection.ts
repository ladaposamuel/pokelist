import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Organisation } from './models/Organisation.entity';
import { User } from './models/User.entity';
import { Pokemon } from './models/Pokemon.entity';
import { Favorite } from './models/Favorite.entity';
import InitialSeeder from './seeds/initial.seeder';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
} from '../app/constants';

const connectionOptions: DataSourceOptions & SeederOptions = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Organisation, User, Pokemon, Favorite],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  seeds: [InitialSeeder],
  migrations: ['src/database/migrations/*{.ts,.js}'],
};

export default new DataSource({
  ...connectionOptions,
});
