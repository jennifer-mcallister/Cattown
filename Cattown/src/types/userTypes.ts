export interface IUser {
  username: string;
  password: string;
  email: string;
}

export interface IUserRegister extends IUser {}

export interface IUserLogin {
  email: string;
  password: string;
}
