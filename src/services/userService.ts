import dataSource from '../database/connection';
import { User } from '../database/models/User.entity';
import { ServiceResponse } from '../util/serviceResponse';

export class UserService {
  public static readonly COOKIE_NAME = 'token';

  private static model = dataSource.getRepository(User);

  public static async id(id: number) {
    const user = await this.model.findOne({
      where: { id },
      relations: ['organisation'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password) {
      delete user.password;
    }

    return ServiceResponse.success<User>('User found', user);
  }

  public static email(email: string) {
    return this.model.findOneBy({ email });
  }
}
