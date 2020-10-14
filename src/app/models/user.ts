export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export class User implements IUser {

  constructor(
    public id: string,
    public firstName: string,
    public lastName: string
  ) {}
}
