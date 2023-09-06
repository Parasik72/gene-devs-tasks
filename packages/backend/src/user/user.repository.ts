import { IUser, User } from './models/user.model';
import { type ICreateUser } from './user.types';

export class UserRepository {
  async getOneUserByEmail (email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async createUser (data: ICreateUser): Promise<IUser | null> {
    return User.create(data);
  }
}
