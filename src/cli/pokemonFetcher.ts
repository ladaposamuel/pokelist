// import Pokedex, { Type } from 'pokedex-promise-v2';
// import { PokemonService } from '../services/pokemonService';
// import 'dotenv/config';

// const P = new Pokedex();

// interface PokemonDetails {
//   name: string;
//   types: string[];
//   imageUrl: string | null;
// }

// async function getPokemonDetails(
//   pokemonId: number
// ): Promise<PokemonDetails | undefined> {
//   try {
//     const pokemon = await P.getPokemonByName(pokemonId);
//     const name = pokemon.name;
//     const types = pokemon.types.map((typeInfo: Type) => typeInfo.type.name);
//     const imageUrl = pokemon.sprites.front_default;

//     console.log(`Name: ${name}`);
//     console.log(`Types: ${types.join(', ')}`);
//     console.log(`Image URL: ${imageUrl}`);
//     console.log('----------------------------------');

//     return {
//       name,
//       types,
//       imageUrl,
//     };
//   } catch (error: unknown) {
//     console.error(`Error fetching details for Pokémon ID ${pokemonId}:`, error);
//     return undefined;
//   }
// }

// async function savePokemonToDatabase(pokemonDetails: PokemonDetails) {
//   const { name, types, imageUrl } = pokemonDetails;
//   const description = `A Pokémon with the following types: ${types.join(', ')}`;

//   try {
//     await PokemonService.create({
//       name,
//       description,
//       image: imageUrl || '',
//       type: types.join(','),
//     });
//     console.log(`Successfully saved ${name} to the database.`);
//   } catch (error) {
//     console.error(`Error saving ${name} to the database:`, error);
//   }
// }

// async function main() {
//   const args = process.argv.slice(2);
//   const shouldStoreInDB = args.includes('storeindb');

//   for (let i = 1; i <= 50; i++) {
//     const pokemonDetails = await getPokemonDetails(i);
//     if (pokemonDetails && shouldStoreInDB) {
//       await savePokemonToDatabase(pokemonDetails);
//     }
//   }
// }

// main();

const hello = () => {
  console.log('Hello World');
};

hello();
