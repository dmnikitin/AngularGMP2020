export interface ICourse {
  id: string;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  rated: boolean;
}

export class Course implements ICourse {

  constructor(
    public id: string,
    public title: string,
    public creationDate: string,
    public duration: number,
    public description: string,
    public rated: boolean
  ) {}
}
