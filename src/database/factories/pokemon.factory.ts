import { setSeederFactory } from 'typeorm-extension';
import { Pokemon } from '../models/Pokemon.entity';

export default setSeederFactory(Pokemon, (faker) => {
  const pokemon = new Pokemon();
  pokemon.name = faker.animal.cat();
  pokemon.description = faker.lorem.sentence();
  pokemon.image = faker.image.url();
  pokemon.type = faker.helpers.arrayElement([
    'fire',
    'water',
    'grass',
    'electric',
  ]);
  return pokemon;
});
