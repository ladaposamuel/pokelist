import dataSource from '../database/connection';
import { Organisation } from '../database/models/Organisation.entity';
import { ServiceResponse } from '../util/serviceResponse';
import { Pokemon } from '../database/models/Pokemon.entity';
import { plainToInstance } from 'class-transformer';
import { Favorite } from '../database/models/Favorite.entity';

interface PokemonWithStats extends Pokemon {
  likes: number;
  dislikes: number;
}
export class OrganisationService {
  private static model = dataSource.getRepository(Organisation);

  public static async all(): Promise<ServiceResponse<Organisation[] | null>> {
    const organisations = await this.model.find({
      relations: ['pokemons', 'pokemons.favorites', 'pokemons.favorites.user'],
    });

    if (!organisations) {
      throw new Error('Organisations not found');
    }

    organisations.forEach((organisation) => {
      organisation.pokemons = organisation.pokemons.map((pokemon) =>
        this.processPokemon(pokemon)
      );
    });

    return ServiceResponse.success<Organisation[]>(
      'All organisations',
      organisations
    );
  }

  public static async id(
    id: number
  ): Promise<ServiceResponse<Organisation | null>> {
    const organisation = await this.model.findOne({
      where: { id },
      relations: ['pokemons', 'pokemons.favorites', 'pokemons.favorites.user'],
    });

    if (!organisation) {
      throw new Error('Organisation not found');
    }

    organisation.pokemons = organisation.pokemons.map((pokemon) =>
      this.processPokemon(pokemon)
    );

    return ServiceResponse.success<Organisation>(
      'Organisation found',
      organisation
    );
  }

  private static processPokemon(pokemon: Pokemon): PokemonWithStats {
    const likes = pokemon.favorites.filter((favorite) => favorite.liked).length;
    const dislikes = pokemon.favorites.filter(
      (favorite) => !favorite.liked
    ).length;

    return {
      ...pokemon,
      likes,
      dislikes,
      favorites: pokemon.favorites.map((favorite) => {
        const favoriteData = {
          liked: favorite.liked,
          userId: favorite.user.id,
        };
        return plainToInstance(Favorite, favoriteData);
      }),
    };
  }
}
