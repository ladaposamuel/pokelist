import { setSeederFactory } from 'typeorm-extension';
import { Pokemon } from '../models/Pokemon.entity';
import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export default setSeederFactory(Pokemon, async (faker) => {
  const pokemonId = faker.number.int({ min: 1, max: 898 });

  try {
    const response = await axios.get(
      `${POKEAPI_BASE_URL}/pokemon/${pokemonId}`
    );
    const pokemonData = response.data;

    // Create a new Pokemon entity
    const pokemon = new Pokemon();
    pokemon.name = pokemonData.name;
    pokemon.description = `A Pokémon named ${pokemon.name} - ${pokemonData.types[0].type.name} type, and is ${pokemonData.height}m tall and weighs ${pokemonData.weight}kg.`;
    pokemon.image = pokemonData.sprites.front_default;
    pokemon.type = pokemonData.types
      .map((typeInfo: any) => typeInfo.type.name)
      .join(',');

    return pokemon;
  } catch (error) {
    console.error(`Error fetching Pokémon data for ID ${pokemonId}:`, error);
    // Fallback: return a Pokemon entity with fake data if the API call fails
    const fallbackPokemon = new Pokemon();
    fallbackPokemon.name = faker.animal.type();
    fallbackPokemon.description = faker.lorem.sentence();
    fallbackPokemon.image = faker.image.avatar();
    fallbackPokemon.type = faker.helpers.arrayElement([
      'fire',
      'water',
      'grass',
      'electric',
    ]);
    return fallbackPokemon;
  }
});
