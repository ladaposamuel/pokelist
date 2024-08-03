import dataSource from '../database/connection';
import { Organisation } from '../database/models/Organisation.entity';
import { ServiceResponse } from '../util/serviceResponse';

export class OrganisationService {
  private static model = dataSource.getRepository(Organisation);

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...organisationWithoutPassword } = organisation;

    return ServiceResponse.success<Organisation>(
      'Organisation found',
      organisationWithoutPassword
    );
  }
}
