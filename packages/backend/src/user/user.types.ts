export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUserAccess {
  accessToken: string;
  email: string;
}
