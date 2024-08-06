import { setSeederFactory } from 'typeorm-extension';
import { Pokemon } from '../models/Pokemon.entity';
import axios from 'axios';

import { POKEAPI_BASE_URL } from '../../app/constants';

export default setSeederFactory(Pokemon, async () => {
  const pokemonId = Math.floor(Math.random() * 200) + 1;

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
    throw error; // Rethrow the error to prevent the factory from creating an entity
  }
});
