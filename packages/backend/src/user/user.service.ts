import { compare, hash } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { PASSWORD_HASH_SALT } from './user.constants';
import { ICreateUser } from './user.types';

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async getOneUserByEmail(email: string) {
    return this.userRepository.getOneUserByEmail(email);
  }

  async createUser(data: ICreateUser) {
    return this.userRepository.createUser(data);
  }

  async hashPassword(password: string) {
    return hash(password, PASSWORD_HASH_SALT);
  }

  async verifyPassword(inputPassword: string, hashedPassword: string) {
    return compare(inputPassword, hashedPassword);
  }
}
