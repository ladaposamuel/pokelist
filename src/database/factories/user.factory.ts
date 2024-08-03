import { setSeederFactory } from 'typeorm-extension';
import { User } from '../models/User.entity';
import { createHash } from '../../util/hash';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.password = await createHash('password');
  return user;
});
