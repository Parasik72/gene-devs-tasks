class UserModel {
  constructor(
    public isAuth: boolean,
    public email: string
  ) {}
}

const createUserModel = (isAuth: boolean, email: string) =>
  new UserModel(isAuth, email);

export { createUserModel };

export default UserModel;
