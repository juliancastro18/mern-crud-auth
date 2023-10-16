export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInputDTO {
  username: string;
  email: string;
  password: string;
}