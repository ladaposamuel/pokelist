import { setSeederFactory } from 'typeorm-extension';
import { Favorite } from '../models/Favorite.entity';

export default setSeederFactory(Favorite, (faker) => {
  const favorite = new Favorite();
  favorite.liked = faker.datatype.boolean();
  return favorite;
});
