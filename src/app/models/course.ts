export interface ICourse {
  id: string;
  title: string;
  createdAt: string;
  duration: number;
  description: string;
}

export class Course implements ICourse {

  public id: string;
  public title: string;
  public createdAt: string;
  public duration: number;
  public description: string;

  constructor(id: string, title: string, createdAt: string, duration: number, description: string) {
    Object.assign(this, {id, title, createdAt, duration, description});
  }
}
