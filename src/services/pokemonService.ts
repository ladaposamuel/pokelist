import dataSource from '../database/connection';
import { Pokemon } from '../database/models/Pokemon.entity';
import { Favorite } from '../database/models/Favorite.entity';
import { User } from '../database/models/User.entity';
import { Organisation } from '../database/models/Organisation.entity';
import { ServiceResponse } from '../util/serviceResponse';

export class PokemonService {
  private static model = dataSource.getRepository(Pokemon);
  private static organisationModel = dataSource.getRepository(Organisation);
  private static favoriteModel = dataSource.getRepository(Favorite);
  private static userModel = dataSource.getRepository(User);

  public static async create({
    name,
    description,
    image,
    type,
  }: {
    name: string;
    description: string;
    image: string;
    type: string;
  }): Promise<ServiceResponse<Pokemon | null>> {
    const checkExist = await this.model.findOne({
      where: { name },
    });

    if (checkExist) {
      throw new Error('Pokemon already exist');
    }

    const organisations = await this.organisationModel.find();

    const randomIndex = Math.floor(Math.random() * organisations.length);
    const randomOrganisation = organisations[randomIndex];

    const pokemon = this.model.create({
      name,
      description,
      image,
      type,
      organisation: randomOrganisation,
    });

    await this.model.save(pokemon);

    return ServiceResponse.success('Pokemon created', pokemon);
  }

  public static async favorite(
    id: number,
    userId: number
  ): Promise<ServiceResponse<{ liked: boolean }>> {
    const pokemon = await this.model.findOne({
      where: { id },
      relations: ['favorites', 'favorites.user'],
    });

    if (!pokemon) throw new Error('Pokemon not found');

    const user = await this.userModel.findOne({ where: { id: userId } });

    if (!user) throw new Error('User not found');

    const favorite = pokemon.favorites.find(
      (fav) => fav.user.id === Number(userId)
    );

    if (favorite) {
      favorite.liked = !favorite.liked;
      await this.favoriteModel.save(favorite);
    } else {
      const newFavorite = this.favoriteModel.create({
        liked: true,
        user,
        pokemon,
      });
      pokemon.favorites.push(newFavorite);
      await this.favoriteModel.save(newFavorite);
    }

    return ServiceResponse.success('Favorite updated', {
      liked: favorite ? !favorite.liked : true,
    });
  }
}
