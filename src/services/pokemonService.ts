import dataSource from '../database/connection';
import { Pokemon } from '../database/models/Pokemon.entity';
import { Organisation } from '../database/models/Organisation.entity';
import { ServiceResponse } from '../util/serviceResponse';

export class PokemonService {
  private static model = dataSource.getRepository(Pokemon);
  private static organisationModel = dataSource.getRepository(Organisation);

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
}
