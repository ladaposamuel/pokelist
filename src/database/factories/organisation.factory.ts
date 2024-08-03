import { setSeederFactory } from 'typeorm-extension';
import { Organisation } from '../models/Organisation.entity';

export default setSeederFactory(Organisation, (faker) => {
  const organisation = new Organisation();
  organisation.name = faker.company.name();
  organisation.status = faker.helpers.arrayElement(['active', 'inactive']);
  return organisation;
});
