import dataSource from '../database/connection';
import { Organisation } from '../database/models/Organisation.entity';
import { ServiceResponse } from '../util/serviceResponse';
import { Pokemon } from '../database/models/Pokemon.entity';
import { User } from '../database/models/User.entity';

interface PokemonWithStats extends Pokemon {
  likes: number;
  dislikes: number;
}

export class OrganisationService {
  private static model = dataSource.getRepository(Organisation);
  private static userModel = dataSource.getRepository(User);

  /**
   * Get all organisations
   * @returns \ServiceResponse<Organisation[] | null>
   */
  public static async all(): Promise<ServiceResponse<Organisation[] | null>> {
    const organisations = await this.model.find({
      relations: ['pokemons'],
    });

    if (!organisations) {
      throw new Error('Organisations not found');
    }

    return ServiceResponse.success<Organisation[]>(
      'All organisations',
      organisations
    );
  }

  /**
   * Get organisation by id
   * @param id \ServiceResponse<Organisation | null>
   * @returns
   */
  public static async id(
    id: number
  ): Promise<ServiceResponse<Organisation | null>> {
    const organisation = await this.model.findOne({
      where: { id },
      relations: ['pokemons'],
    });

    if (!organisation) {
      throw new Error('Organisation not found');
    }

    return ServiceResponse.success<Organisation>(
      'Organisation found',
      organisation
    );
  }

  /**
   * Get pokemons assigned to an organisation for a user
   * @param userId User Id
   * @returns
   */
  public static async getPokemonsForUser(
    userId: number
  ): Promise<ServiceResponse<PokemonWithStats[] | null>> {
    const user = await this.userModel.findOne({
      where: { id: userId },
      relations: ['organisation', 'favorites', 'favorites.pokemon'],
    });

    if (!user || !user.organisation) {
      return ServiceResponse.failure(
        'User or organisation not found',
        null,
        404
      );
    }

    const organisationPokemons = await this.model.findOne({
      where: { id: user.organisation.id },
      relations: ['pokemons', 'pokemons.favorites', 'pokemons.favorites.user'],
    });

    if (!organisationPokemons) {
      return ServiceResponse.failure(
        'Could not find organisation pokemons',
        null
      );
    }

    const pokemonsWithStats = organisationPokemons.pokemons.map((pokemon) => {
      const likes = pokemon.favorites.filter((fav) => fav.liked).length;
      const dislikes = pokemon.favorites.filter((fav) => !fav.liked).length;
      return { ...pokemon, likes, dislikes };
    });

    return ServiceResponse.success(
      'Pokemons fetched successfully',
      pokemonsWithStats
    );
  }
}
