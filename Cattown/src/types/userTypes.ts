export interface IUser {
  username: string;
  password: string;
  mail: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserRegister extends IUser {}

export interface IUserSubmitNewPassword extends IUserLogin {
  userId: string;
}
