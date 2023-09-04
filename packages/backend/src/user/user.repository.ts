import { User } from './models/user.model';
import { type ICreateUser } from './user.types';

export class UserRepository {
  async getOneUserByEmail (email: string) {
    return await User.findOne({ email });
  }

  async createUser (data: ICreateUser) {
    return await User.create(data);
  }
}
