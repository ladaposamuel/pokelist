import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Organisation } from '../models/Organisation.entity';
import { User } from '../models/User.entity';
import { Pokemon } from '../models/Pokemon.entity';

export default class InitialSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const organisationFactory = factoryManager.get(Organisation);
    const userFactory = factoryManager.get(User);
    const pokemonFactory = factoryManager.get(Pokemon);

    console.log('🚀 ~ Seeder ~ InitialSeeder ~ start');

    console.log('🚀 ~ Seeder ~ Creating 10 organisations');
    const organisations = await organisationFactory.saveMany(10);

    console.log(
      '🚀 ~ Seeder ~ Creating 10 users and assigning them to organisations'
    );
    await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const organisation =
          organisations[Math.floor(Math.random() * organisations.length)];
        return userFactory.save({ organisation });
      })
    );

    console.log('🚀 ~ Seeder ~ Creating 50 pokemons for each organisation');
    await Promise.all(
      Array.from({ length: 50 }).map(async () => {
        const organisation =
          organisations[Math.floor(Math.random() * organisations.length)];
        return pokemonFactory.save({ organisation });
      })
    );

    //TODO: Create favorites for users

    console.log('🚀 ~ Seeder ~ InitialSeeder ~ finished');
  }
}
