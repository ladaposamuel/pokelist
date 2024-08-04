import dataSource from '../database/connection';
import { User } from '../database/models/User.entity';
import { ServiceResponse } from '../util/serviceResponse';

export class UserService {
  private static model = dataSource.getRepository(User);

  public static async id(id: number): Promise<ServiceResponse<User | null>> {
    const user = await this.model.findOne({
      where: { id },
      relations: ['organisation'],
    });

    if (!user) {
      return ServiceResponse.failure('User not found', null, 404);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    const userWithoutPasswordInstance = new User();
    Object.assign(userWithoutPasswordInstance, userWithoutPassword);

    return ServiceResponse.success<User>(
      'User found',
      userWithoutPasswordInstance
    );
  }

  public static email(email: string) {
    return this.model.findOneBy({ email });
  }
}
