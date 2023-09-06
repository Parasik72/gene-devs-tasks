import { UserFromServerDto } from './dto/user-from-server.dto';

class UserModel {
  constructor(public isAuth: boolean) {}
}

const createUserModel = (userFromServer: UserFromServerDto) =>
  new UserModel(userFromServer.isAuth);

export { createUserModel };

export default UserModel;
