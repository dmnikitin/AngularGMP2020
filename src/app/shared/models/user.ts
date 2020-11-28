export interface IUser {
  id: number;
  token: string;
  name: IUserName;
  login: string;
  password: string;
}

interface IUserName {
  firstName: string;
  lastName: string;
}

export class User implements IUser {
  constructor(
    public id: number,
    public name: IUserName,
    public token: string,
    public login: string,
    public password: string
  ) {}
}
