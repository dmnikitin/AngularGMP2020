export interface IUser {
  id: number;
  fakeToken: string;
  name: IUserName;
  login: string;
  password: string;
}

interface IUserName {
  firstName: string;
  lastName: string;
}

export interface ILogin {
  login: string;
  password: string;
}

export type Token = { token: string };

export class User implements IUser {
  constructor(
    public id: number,
    public name: IUserName,
    public fakeToken: string,
    public login: string,
    public password: string
  ) {}
}
