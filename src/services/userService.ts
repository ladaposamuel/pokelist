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
      throw new Error('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return ServiceResponse.success<User>('User found', userWithoutPassword);
  }

  public static email(email: string) {
    return this.model.findOneBy({ email });
  }
}
