import UserModel from './user.model';

export interface IUserAccess {
  accessToken: string;
  user: UserModel;
}
