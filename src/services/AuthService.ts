import dataSource from '../database/connection';
import { User } from '../database/models/User.entity';
import { Organisation } from '../database/models/Organisation.entity';
import { createHash, verifyHash } from '../util/hash';
import { ServiceResponse } from '../util/serviceResponse';
import { jwt } from '../middleware/auth';

export class AuthService {
  private static model = dataSource.getRepository(User);
  private static organizationModel = dataSource.getRepository(Organisation);

  public static async register({
    name,
    email,
    password,
    organisationId,
  }: {
    name: string;
    email: string;
    password: string;
    organisationId: number;
  }): Promise<
    ServiceResponse<(Omit<User, 'password'> & { token: string }) | null>
  > {
    const user = await this.model.findOneBy({ email });

    if (user) {
      return ServiceResponse.failure('Email is already registered', null, 400);
    }

    const organisation = await this.organizationModel.findOne({
      where: { id: organisationId },
    });

    if (!organisation) {
      return ServiceResponse.failure('Organisation not found', null, 400);
    }

    const newUser = this.model.create({
      name,
      email,
      password: await createHash(password),
      organisation,
    });

    await this.model.save(newUser);

    const token = jwt.sign(newUser.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = newUser;
    return ServiceResponse.success('Account created successfully', {
      ...userWithoutPassword,
      token,
    });
  }

  public static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<
    ServiceResponse<(Omit<User, 'password'> & { token: string }) | null>
  > {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return ServiceResponse.failure('Invalid credentials', null, 401);
    }

    const isPasswordValid = await verifyHash(password, user.password);

    if (!isPasswordValid) {
      return ServiceResponse.failure('Invalid credentials', null, 401);
    }

    const token = jwt.sign(user.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;
    return ServiceResponse.success('Login successful', {
      ...userWithoutPassword,
      token,
    });
  }
}
