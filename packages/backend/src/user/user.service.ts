import { compare, hash } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { PASSWORD_HASH_SALT } from './user.constants';
import { ICreateUser } from './user.types';
import { IUser } from './models/user.model';

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async getOneUserByEmail(email: string): Promise<IUser | null>  {
    return this.userRepository.getOneUserByEmail(email);
  }

  async createUser(data: ICreateUser): Promise<IUser | null>  {
    return this.userRepository.createUser(data);
  }

  async hashPassword(password: string): Promise<string>  {
    return hash(password, PASSWORD_HASH_SALT);
  }

  async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean>  {
    return compare(inputPassword, hashedPassword);
  }
}
